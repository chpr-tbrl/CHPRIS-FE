import React, { Fragment, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { format } from "date-fns";
import {
  PageHeader,
  Spacer,
  TabBar,
  DatePicker,
  ErrorMessage,
} from "components";
import {
  Stack,
  Form,
  Modal,
  Button,
  Column,
  Loading,
  FlexGrid,
  FormGroup,
  FormLabel,
  TextInput,
  RadioButton,
  RadioButtonGroup,
  InlineLoading,
  ActionableNotification,
} from "@carbon/react";
import { Hospital } from "@carbon/icons-react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { LAB_RESULTS_SCHEMA, NOT_DONE } from "schemas";
import { useSelector } from "react-redux";
import { recordSelector } from "features";
import {
  useGetLabResultsQuery,
  useNewLabResultMutation,
  useUpdateLabResultMutation,
} from "services";
import { useNavigate } from "react-router-dom";
import { getResultType, normalizeData, deNormalizeData } from "utils";
import { useGetSpecimensQuery } from "services";

const LabResults = () => {
  const [prompt, setPrompt] = useState(false);
  const [cache, setCache] = useState({});
  const record = useSelector(recordSelector);
  const navigate = useNavigate();
  const [newLabResult, { isLoading: isCreating }] = useNewLabResultMutation();
  const [updateLabResult, { isLoading: isUpdating }] =
    useUpdateLabResultMutation();
  const {
    data: results = [],
    isFetching,
    isError,
    refetch,
  } = useGetLabResultsQuery(record.record_id, {
    refetchOnMountOrArgChange: true,
  });
  const isUpdate = results[0]?.lab_id ? true : false;

  const [open, setOpen] = useState(true);

  const {
    reset,
    watch,
    control,
    setValue,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: LAB_RESULTS_SCHEMA.cast(),
    resolver: yupResolver(LAB_RESULTS_SCHEMA),
  });

  const { data: specimens = [] } = useGetSpecimensQuery(record.record_id, {
    refetchOnMountOrArgChange: true,
  });

  useEffect(() => {
    if (specimens.length === 0) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  }, [specimens, reset]);

  const isResultOneDone =
    watch("lab_smear_microscopy_result_result_1", NOT_DONE) !== NOT_DONE;
  const MTBResult = watch("lab_xpert_mtb_rif_assay_result", NOT_DONE);
  const MTBResultTwo = watch("lab_xpert_mtb_rif_assay_result_2", NOT_DONE);
  const isLFDone = watch("lab_urine_lf_lam_result", NOT_DONE) !== NOT_DONE;
  const cultureFields = watch([
    "lab_culture_mgit_culture",
    "lab_culture_lj_culture",
  ]);
  const LPAFields = watch([
    "lab_lpa_mtbdrplus_isoniazid",
    "lab_lpa_mtbdrplus_rifampin",
    "lab_lpa_mtbdrs_flouoroquinolones",
    "lab_lpa_mtbdrs_kanamycin",
    "lab_lpa_mtbdrs_amikacin",
    "lab_lpa_mtbdrs_capreomycin",
    "lab_lpa_mtbdrs_low_level_kanamycin",
  ]);
  const DSTFields = watch([
    "lab_dst_isonazid",
    "lab_dst_rifampin",
    "lab_dst_ethambutol",
    "lab_dst_kanamycin",
    "lab_dst_ofloxacin",
    "lab_dst_levofloxacinekanamycin",
    "lab_dst_moxifloxacinekanamycin",
    "lab_dst_amikacinekanamycin",
  ]);

  // Populate form with results
  useEffect(() => {
    if (results.length) {
      // normalize data to lowerCase
      const data = deNormalizeData(results[0]);
      // populate form with existing fields
      reset(data);
    }
  }, [results, reset]);

  // Capitalize text inputs
  useEffect(() => {
    Array.prototype.forEach.call(
      document.querySelectorAll("input[type=text],textarea"),
      function (input) {
        input.addEventListener("input", function () {
          input.value = input.value.toUpperCase();
        });
      }
    );
  });

  // check result type
  function checkResultType(data) {
    const resultType = getResultType(data);
    const normalizedData = normalizeData(data);
    if (resultType === "positive") {
      setPrompt(true);
      setCache({
        ...normalizedData,
        lab_result_type: resultType,
        record_id: record.record_id,
      });
      return;
    } else if (isUpdate) {
      handleResultUpdate({
        ...normalizedData,
        lab_result_type: resultType,
        record_id: record.record_id,
      });
    } else {
      handleResultCreation({
        ...normalizedData,
        lab_result_type: resultType,
        record_id: record.record_id,
      });
    }
  }

  function confirmResult() {
    setPrompt(false);
    if (isUpdate) {
      handleResultUpdate(cache);
      return;
    }
    handleResultCreation(cache);
  }

  // format date
  function formatDate(date) {
    if (!date || date === "" || date === "0000-00-00") return date;
    return format(new Date(date), "yyyy-MM-dd");
  }

  // Create record
  async function handleResultCreation(data) {
    const request = {
      ...data,
      lab_date_specimen_collection_received: formatDate(
        data.lab_date_specimen_collection_received
      ),
      lab_smear_microscopy_result_date: formatDate(
        data.lab_smear_microscopy_result_date
      ),
      lab_xpert_mtb_rif_assay_date: formatDate(
        data.lab_xpert_mtb_rif_assay_date
      ),
      lab_urine_lf_lam_date: formatDate(data.lab_urine_lf_lam_date),
      lab_culture_date: formatDate(data.lab_culture_date),
      lab_lpa_date: formatDate(data.lab_lpa_date),
      lab_dst_date: formatDate(data.lab_dst_date),
    };

    try {
      await newLabResult(request).unwrap();
      toast.success("Lab result recorded");
      navigate("/dashboard");
    } catch (error) {
      // we handle errors with middleware
    }
  }

  // Update record
  async function handleResultUpdate(data) {
    const request = {
      ...data,
      lab_xpert_mtb_rif_assay_result_done:
        results[0].lab_xpert_mtb_rif_assay_result !== "NOT_DONE" ? true : false,
      lab_date_specimen_collection_received: formatDate(
        data.lab_date_specimen_collection_received
      ),
      lab_smear_microscopy_result_date: formatDate(
        data.lab_smear_microscopy_result_date
      ),
      lab_xpert_mtb_rif_assay_date: formatDate(
        data.lab_xpert_mtb_rif_assay_date
      ),
      lab_urine_lf_lam_date: formatDate(data.lab_urine_lf_lam_date),
      lab_culture_date: formatDate(data.lab_culture_date),
      lab_lpa_date: formatDate(data.lab_lpa_date),
      lab_dst_date: formatDate(data.lab_dst_date),
    };

    try {
      await updateLabResult(request).unwrap();
      toast.success("Lab result updated");
      refetch();
    } catch (error) {
      // we handle errors with middleware
    }
  }

  if (isFetching) return <Loading />;

  return (
    <FlexGrid fullWidth className="page">
      <Modal
        open={open}
        passiveModal
        onRequestClose={() => {
          setOpen(false);
          navigate("/dashboard/records");
        }}
      >
        <Stack gap={7}>
          <h4>Create Specimen</h4>
          <p> You will have to add a specimen before proceeding</p>
        </Stack>
      </Modal>

      <Column sm={4} lg={{ span: 8, offset: 4 }}>
        <TabBar />
        <PageHeader
          title="Lab Results"
          description="Manage and update lab results"
          renderIcon={<Hospital size={42} />}
        />
        <Spacer h={7} />
        <Stack orientation="horizontal" gap={10}>
          <div>
            <FormLabel>ID</FormLabel>
            <p>{record?.record_id}</p>
          </div>
          <div>
            <FormLabel>Patient's name</FormLabel>
            <p>{record?.records_name}</p>
          </div>
        </Stack>
        <Spacer h={7} />
        {isError && (
          <Fragment>
            <ActionableNotification
              inline
              kind="error"
              title="An error occured"
              subtitle="while fetching lab results"
              lowContrast
              hideCloseButton
              actionButtonLabel="try again"
              onActionButtonClick={refetch}
            />
            <Spacer h={7} />
          </Fragment>
        )}
        <Form
          className="data--collection"
          onSubmit={handleSubmit(checkResultType)}
        >
          <Stack gap={7}>
            <DatePicker
              control={control}
              id="lab_date_specimen_collection_received"
              invalid={
                errors.lab_date_specimen_collection_received ? true : false
              }
              invalidText={
                errors.lab_date_specimen_collection_received?.message
              }
            />

            <TextInput
              id="lab_received_by"
              labelText="Received by"
              {...register("lab_received_by")}
              invalid={errors.lab_received_by ? true : false}
              invalidText={errors.lab_received_by?.message}
            />

            <TextInput
              id="lab_registration_number"
              labelText="Lab registration number"
              {...register("lab_registration_number")}
              invalid={errors.lab_registration_number ? true : false}
              invalidText={errors.lab_registration_number?.message}
            />

            <FormGroup legendText="Smear microscopy result">
              <Stack gap={7}>
                <RadioButtonGroup
                  orientation="vertical"
                  legendText="Result 1"
                  name="lab_smear_microscopy_result_result_1"
                  valueSelected={watch("lab_smear_microscopy_result_result_1")}
                  onChange={(evt) => {
                    if (evt === NOT_DONE) {
                      setValue("lab_smear_microscopy_result_result_2", evt);
                    }
                    setValue("lab_smear_microscopy_result_result_1", evt);
                  }}
                >
                  <RadioButton labelText="No AFB seen" value="no_afb_seen" />
                  <RadioButton labelText="Scanty" value="scanty" />
                  <RadioButton labelText="1+" value="1+" />
                  <RadioButton labelText="2+" value="2+" />
                  <RadioButton labelText="3+" value="3+" />
                  <RadioButton
                    labelText="TB LAMP - Positive"
                    value="tb_lamp_positive"
                  />
                  <RadioButton
                    labelText="TB LAMP - Negative"
                    value="tb_lamp_negative"
                  />
                  <RadioButton labelText="Not done" value="not_done" />
                </RadioButtonGroup>

                {isResultOneDone && (
                  <Fragment>
                    <RadioButtonGroup
                      orientation="vertical"
                      legendText="Result 2"
                      name="lab_smear_microscopy_result_result_2"
                      valueSelected={watch(
                        "lab_smear_microscopy_result_result_2"
                      )}
                      onChange={(evt) =>
                        setValue("lab_smear_microscopy_result_result_2", evt)
                      }
                    >
                      <RadioButton
                        labelText="No AFB seen"
                        value="no_afb_seen"
                      />
                      <RadioButton
                        labelText="Scanty"
                        value="scanty"
                        id="scanty"
                      />
                      <RadioButton labelText="1+" value="1+" id="1+" />
                      <RadioButton labelText="2+" value="2+" id="2+" />
                      <RadioButton labelText="3+" value="3+" id="3+" />
                      <RadioButton
                        labelText="TB LAMP - Positive"
                        value="tb_lamp_positive"
                      />
                      <RadioButton
                        labelText="TB LAMP - Negative"
                        value="tb_lamp_negative"
                      />
                      <RadioButton labelText="Not done" value="not_done" />
                    </RadioButtonGroup>

                    <DatePicker
                      control={control}
                      labelText="Date"
                      id="lab_smear_microscopy_result_date"
                      invalid={
                        errors.lab_smear_microscopy_result_date ? true : false
                      }
                      invalidText={
                        errors.lab_smear_microscopy_result_date?.message
                      }
                    />

                    <TextInput
                      id="lab_smear_microscopy_result_done_by"
                      labelText="Done by"
                      {...register("lab_smear_microscopy_result_done_by")}
                      invalid={
                        errors.lab_smear_microscopy_result_done_by
                          ? true
                          : false
                      }
                      invalidText={
                        errors.lab_smear_microscopy_result_done_by?.message
                      }
                    />
                  </Fragment>
                )}
              </Stack>
            </FormGroup>

            <FormGroup legendText="Xpert MTB/RIF assay">
              <Stack gap={7}>
                <RadioButtonGroup
                  orientation="vertical"
                  legendText="MTB result"
                  name="lab_xpert_mtb_rif_assay_result"
                  valueSelected={watch("lab_xpert_mtb_rif_assay_result")}
                  onChange={(evt) => {
                    setValue("lab_xpert_mtb_rif_assay_result", evt);
                    setValue("lab_xpert_mtb_rif_assay_grades", null);
                    setValue("lab_xpert_mtb_rif_assay_rif_result", NOT_DONE);
                    setValue("lab_xpert_mtb_rif_assay_grades_2", null);
                    setValue("lab_xpert_mtb_rif_assay_rif_result_2", NOT_DONE);
                    setValue("lab_xpert_mtb_rif_assay_result_2", NOT_DONE);
                  }}
                >
                  <RadioButton labelText="Detected" value="detected" />
                  <RadioButton labelText="Not detected" value="not_detected" />
                  <RadioButton
                    labelText="Error/invalid"
                    value="error_invalid"
                  />
                  <RadioButton labelText="Not done" value="not_done" />
                </RadioButtonGroup>

                {MTBResult === "detected" && (
                  <Fragment>
                    <Stack gap={5}>
                      <RadioButtonGroup
                        orientation="vertical"
                        legendText="Grades"
                        name="lab_xpert_mtb_rif_assay_grades"
                        valueSelected={watch("lab_xpert_mtb_rif_assay_grades")}
                        onChange={(evt) =>
                          setValue("lab_xpert_mtb_rif_assay_grades", evt, {
                            shouldValidate: true,
                          })
                        }
                      >
                        <RadioButton labelText="High" value="high" id="high" />
                        <RadioButton
                          labelText="Medium"
                          value="medium"
                          id="medium"
                        />
                        <RadioButton labelText="Low" value="low" id="low" />
                        <RadioButton
                          labelText="Very low"
                          value="very_low"
                          id="very_low"
                        />
                        <RadioButton labelText="Trace" value="trace" />
                      </RadioButtonGroup>
                      {errors?.lab_xpert_mtb_rif_assay_grades && (
                        <ErrorMessage id="lab_xpert_mtb_rif_assay_grades" />
                      )}
                    </Stack>

                    <RadioButtonGroup
                      orientation="vertical"
                      legendText="RIF result"
                      name="lab_xpert_mtb_rif_assay_rif_result"
                      valueSelected={watch(
                        "lab_xpert_mtb_rif_assay_rif_result"
                      )}
                      onChange={(evt) =>
                        setValue("lab_xpert_mtb_rif_assay_rif_result", evt)
                      }
                    >
                      <RadioButton labelText="Detected" value="detected" />
                      <RadioButton
                        labelText="Indeterminate"
                        value="indeterminate"
                      />
                      <RadioButton
                        labelText="Not detected"
                        value="not_detected"
                      />
                      <RadioButton labelText="Not done" value="not_done" />
                    </RadioButtonGroup>
                  </Fragment>
                )}

                {MTBResult !== NOT_DONE && (
                  <RadioButtonGroup
                    orientation="vertical"
                    legendText="MTB result (2)"
                    name="lab_xpert_mtb_rif_assay_result_2"
                    valueSelected={watch("lab_xpert_mtb_rif_assay_result_2")}
                    onChange={(evt) => {
                      setValue("lab_xpert_mtb_rif_assay_grades_2", null);
                      setValue(
                        "lab_xpert_mtb_rif_assay_rif_result_2",
                        NOT_DONE
                      );
                      setValue("lab_xpert_mtb_rif_assay_result_2", evt);
                    }}
                  >
                    <RadioButton labelText="Detected" value="detected" />
                    <RadioButton
                      labelText="Not detected"
                      value="not_detected"
                    />
                    <RadioButton
                      labelText="Error/invalid"
                      value="error_invalid"
                    />
                    <RadioButton labelText="Not done" value="not_done" />
                  </RadioButtonGroup>
                )}

                {MTBResultTwo === "detected" && (
                  <Fragment>
                    <Stack gap={5}>
                      <RadioButtonGroup
                        orientation="vertical"
                        legendText="Grades"
                        name="lab_xpert_mtb_rif_assay_grades_2"
                        valueSelected={watch(
                          "lab_xpert_mtb_rif_assay_grades_2"
                        )}
                        onChange={(evt) =>
                          setValue("lab_xpert_mtb_rif_assay_grades_2", evt, {
                            shouldValidate: true,
                          })
                        }
                      >
                        <RadioButton
                          labelText="High"
                          value="high"
                          id="high_2"
                        />
                        <RadioButton
                          labelText="Medium"
                          value="medium"
                          id="medium_2"
                        />
                        <RadioButton labelText="Low" value="low" id="low_2" />
                        <RadioButton
                          labelText="Very low"
                          value="very_low"
                          id="very_low_2"
                        />
                        <RadioButton labelText="Trace" value="trace" />
                      </RadioButtonGroup>
                      {errors?.lab_xpert_mtb_rif_assay_grades_2 && (
                        <ErrorMessage id="lab_xpert_mtb_rif_assay_grades_2" />
                      )}
                    </Stack>

                    <RadioButtonGroup
                      orientation="vertical"
                      legendText="RIF result"
                      name="lab_xpert_mtb_rif_assay_rif_result_2"
                      valueSelected={watch(
                        "lab_xpert_mtb_rif_assay_rif_result_2"
                      )}
                      onChange={(evt) =>
                        setValue("lab_xpert_mtb_rif_assay_rif_result_2", evt)
                      }
                    >
                      <RadioButton labelText="Detected" value="detected" />
                      <RadioButton
                        labelText="Indeterminate"
                        value="indeterminate"
                      />
                      <RadioButton
                        labelText="Not detected"
                        value="not_detected"
                      />
                      <RadioButton labelText="Not done" value="not_done" />
                    </RadioButtonGroup>
                  </Fragment>
                )}

                {MTBResult !== NOT_DONE && (
                  <Fragment>
                    <DatePicker
                      control={control}
                      labelText="Date"
                      id="lab_xpert_mtb_rif_assay_date"
                      invalid={
                        errors.lab_xpert_mtb_rif_assay_date ? true : false
                      }
                      invalidText={errors.lab_xpert_mtb_rif_assay_date?.message}
                    />

                    <TextInput
                      id="lab_xpert_mtb_rif_assay_done_by"
                      labelText="Done by"
                      {...register("lab_xpert_mtb_rif_assay_done_by")}
                      invalid={
                        errors.lab_xpert_mtb_rif_assay_done_by ? true : false
                      }
                      invalidText={
                        errors.lab_xpert_mtb_rif_assay_done_by?.message
                      }
                    />
                  </Fragment>
                )}
              </Stack>
            </FormGroup>

            <FormGroup legendText="Urine LF-LAM">
              <Stack gap={7}>
                <RadioButtonGroup
                  orientation="vertical"
                  legendText=""
                  name="lab_urine_lf_lam_result"
                  valueSelected={watch("lab_urine_lf_lam_result")}
                  onChange={(evt) => {
                    if (evt === NOT_DONE) {
                      setValue("lab_urine_lf_lam_date", "");
                      setValue("lab_urine_lf_lam_done_by ", "");
                    }
                    setValue("lab_urine_lf_lam_result", evt);
                  }}
                >
                  <RadioButton labelText="Negative" value="negative" />
                  <RadioButton labelText="Positive" value="positive" />
                  <RadioButton
                    labelText="Error/invalid"
                    value="error_invalid"
                  />
                  <RadioButton labelText="Not done" value="not_done" />
                </RadioButtonGroup>

                {isLFDone && (
                  <Fragment>
                    <DatePicker
                      control={control}
                      labelText="Date"
                      id="lab_urine_lf_lam_date"
                      invalid={errors.lab_urine_lf_lam_date ? true : false}
                      invalidText={errors.lab_urine_lf_lam_date?.message}
                    />

                    <TextInput
                      id="lab_urine_lf_lam_done_by"
                      labelText="Done by"
                      {...register("lab_urine_lf_lam_done_by")}
                      invalid={errors.lab_urine_lf_lam_done_by ? true : false}
                      invalidText={errors.lab_urine_lf_lam_done_by?.message}
                    />
                  </Fragment>
                )}
              </Stack>
            </FormGroup>

            <FormGroup legendText="Culture">
              <Stack gap={7}>
                <RadioButtonGroup
                  orientation="vertical"
                  legendText="MGIT Culture"
                  id="lab_culture_mgit_culture"
                  name="lab_culture_mgit_culture"
                  valueSelected={watch("lab_culture_mgit_culture")}
                  onChange={(evt) => setValue("lab_culture_mgit_culture", evt)}
                >
                  <RadioButton labelText="NTM" value="ntm" />
                  <RadioButton labelText="TBC" value="tbc" />
                  <RadioButton labelText="Negative" value="negative" />
                  <RadioButton labelText="Contaminated" value="contaminated" />
                  <RadioButton labelText="Not done" value="not_done" />
                </RadioButtonGroup>

                <RadioButtonGroup
                  orientation="vertical"
                  legendText="LJ Culture"
                  name="lab_culture_lj_culture"
                  valueSelected={watch("lab_culture_lj_culture")}
                  onChange={(evt) => setValue("lab_culture_lj_culture", evt)}
                >
                  <RadioButton labelText="NTM" value="ntm" />
                  <RadioButton labelText="TBC" value="tbc" />
                  <RadioButton labelText="Negative" value="negative" />
                  <RadioButton labelText="Contaminated" value="contaminated" />
                  <RadioButton labelText="Not done" value="not_done" />
                </RadioButtonGroup>

                {cultureFields.some((field) => field !== NOT_DONE) && (
                  <Fragment>
                    <DatePicker
                      control={control}
                      labelText="Date"
                      id="lab_culture_date"
                      invalid={errors.lab_culture_date ? true : false}
                      invalidText={errors.lab_culture_date?.message}
                    />

                    <TextInput
                      id="lab_culture_done_by"
                      labelText="Done by"
                      {...register("lab_culture_done_by")}
                      invalid={errors.lab_culture_done_by ? true : false}
                      invalidText={errors.lab_culture_done_by?.message}
                    />
                  </Fragment>
                )}
              </Stack>
            </FormGroup>

            <FormGroup legendText="Line probe assay (LPA)">
              <p className="form--group__description">
                TB drug susceptibility testing (DST)
              </p>
              <br />
              <Stack gap={7}>
                <FormGroup legendText="First line LPA (MTBDRplus)">
                  <Stack gap={6} className="indented--group">
                    <RadioButtonGroup
                      orientation="vertical"
                      legendText="Isoniazid"
                      name="lab_lpa_mtbdrplus_isoniazid"
                      valueSelected={watch("lab_lpa_mtbdrplus_isoniazid")}
                      onChange={(evt) =>
                        setValue("lab_lpa_mtbdrplus_isoniazid", evt)
                      }
                      invalid={
                        errors.lab_lpa_mtbdrplus_isoniazid ? true : false
                      }
                      invalidText={errors.lab_lpa_mtbdrplus_isoniazid?.message}
                    >
                      <RadioButton labelText="resistant" value="resistant" />
                      <RadioButton
                        labelText="susceptible"
                        value="susceptible"
                      />
                      <RadioButton
                        labelText="indeterminate"
                        value="indeterminate"
                      />
                      <RadioButton labelText="Not done" value="not_done" />
                    </RadioButtonGroup>

                    <RadioButtonGroup
                      orientation="vertical"
                      legendText="Rifampin"
                      name="lab_lpa_mtbdrplus_rifampin"
                      valueSelected={watch("lab_lpa_mtbdrplus_rifampin")}
                      onChange={(evt) =>
                        setValue("lab_lpa_mtbdrplus_rifampin", evt)
                      }
                      invalid={errors.lab_lpa_mtbdrplus_rifampin ? true : false}
                      invalidText={errors.lab_lpa_mtbdrplus_rifampin?.message}
                    >
                      <RadioButton labelText="resistant" value="resistant" />
                      <RadioButton
                        labelText="susceptible"
                        value="susceptible"
                      />
                      <RadioButton
                        labelText="indeterminate"
                        value="indeterminate"
                      />
                      <RadioButton labelText="Not done" value="not_done" />
                    </RadioButtonGroup>
                  </Stack>
                </FormGroup>

                <FormGroup legendText="Second line LPA (MTBDRsl)">
                  <Stack gap={6} className="indented--group">
                    <RadioButtonGroup
                      orientation="vertical"
                      legendText="Flouoroquinolones"
                      name="lab_lpa_mtbdrs_flouoroquinolones"
                      valueSelected={watch("lab_lpa_mtbdrs_flouoroquinolones")}
                      onChange={(evt) =>
                        setValue("lab_lpa_mtbdrs_flouoroquinolones", evt)
                      }
                      invalid={
                        errors.lab_lpa_mtbdrs_flouoroquinolones ? true : false
                      }
                      invalidText={
                        errors.lab_lpa_mtbdrs_flouoroquinolones?.message
                      }
                    >
                      <RadioButton labelText="resistant" value="resistant" />
                      <RadioButton
                        labelText="susceptible"
                        value="susceptible"
                      />
                      <RadioButton
                        labelText="indeterminate"
                        value="indeterminate"
                      />
                      <RadioButton labelText="Not done" value="not_done" />
                    </RadioButtonGroup>

                    <RadioButtonGroup
                      orientation="vertical"
                      legendText="Kanamycin"
                      name="lab_lpa_mtbdrs_kanamycin"
                      valueSelected={watch("lab_lpa_mtbdrs_kanamycin")}
                      onChange={(evt) =>
                        setValue("lab_lpa_mtbdrs_kanamycin", evt)
                      }
                      invalid={errors.lab_lpa_mtbdrs_kanamycin ? true : false}
                      invalidText={errors.lab_lpa_mtbdrs_kanamycin?.message}
                    >
                      <RadioButton labelText="resistant" value="resistant" />
                      <RadioButton
                        labelText="susceptible"
                        value="susceptible"
                      />
                      <RadioButton
                        labelText="indeterminate"
                        value="indeterminate"
                      />
                      <RadioButton labelText="Not done" value="not_done" />
                    </RadioButtonGroup>

                    <RadioButtonGroup
                      orientation="vertical"
                      legendText="Amikacin"
                      name="lab_lpa_mtbdrs_amikacin"
                      valueSelected={watch("lab_lpa_mtbdrs_amikacin")}
                      onChange={(evt) =>
                        setValue("lab_lpa_mtbdrs_amikacin", evt)
                      }
                      invalid={errors.lab_lpa_mtbdrs_amikacin ? true : false}
                      invalidText={errors.lab_lpa_mtbdrs_amikacin?.message}
                    >
                      <RadioButton labelText="resistant" value="resistant" />
                      <RadioButton
                        labelText="susceptible"
                        value="susceptible"
                      />
                      <RadioButton
                        labelText="indeterminate"
                        value="indeterminate"
                      />
                      <RadioButton labelText="Not done" value="not_done" />
                    </RadioButtonGroup>

                    <RadioButtonGroup
                      orientation="vertical"
                      legendText="Capreomycin"
                      name="lab_lpa_mtbdrs_capreomycin"
                      valueSelected={watch("lab_lpa_mtbdrs_capreomycin")}
                      onChange={(evt) =>
                        setValue("lab_lpa_mtbdrs_capreomycin", evt)
                      }
                      invalid={errors.lab_lpa_mtbdrs_capreomycin ? true : false}
                      invalidText={errors.lab_lpa_mtbdrs_capreomycin?.message}
                    >
                      <RadioButton labelText="resistant" value="resistant" />
                      <RadioButton
                        labelText="susceptible"
                        value="susceptible"
                      />
                      <RadioButton
                        labelText="indeterminate"
                        value="indeterminate"
                      />
                      <RadioButton labelText="Not done" value="not_done" />
                    </RadioButtonGroup>

                    <RadioButtonGroup
                      orientation="vertical"
                      legendText="Low-level Kanamycin"
                      name="lab_lpa_mtbdrs_low_level_kanamycin"
                      valueSelected={watch(
                        "lab_lpa_mtbdrs_low_level_kanamycin"
                      )}
                      onChange={(evt) =>
                        setValue("lab_lpa_mtbdrs_low_level_kanamycin", evt)
                      }
                      invalid={
                        errors.lab_lpa_mtbdrs_low_level_kanamycin ? true : false
                      }
                      invalidText={
                        errors.lab_lpa_mtbdrs_low_level_kanamycin?.message
                      }
                    >
                      <RadioButton labelText="resistant" value="resistant" />
                      <RadioButton
                        labelText="susceptible"
                        value="susceptible"
                      />
                      <RadioButton
                        labelText="indeterminate"
                        value="indeterminate"
                      />
                      <RadioButton labelText="Not done" value="not_done" />
                    </RadioButtonGroup>
                  </Stack>
                </FormGroup>

                {LPAFields.some((field) => field !== NOT_DONE) && (
                  <Fragment>
                    <DatePicker
                      control={control}
                      labelText="Date"
                      id="lab_lpa_date"
                      invalid={errors.lab_lpa_date ? true : false}
                      invalidText={errors.lab_lpa_date?.message}
                    />

                    <TextInput
                      id="lab_lpa_done_by"
                      labelText="Done by"
                      {...register("lab_lpa_done_by")}
                      invalid={errors.lab_lpa_done_by ? true : false}
                      invalidText={errors.lab_lpa_done_by?.message}
                    />
                  </Fragment>
                )}
              </Stack>
            </FormGroup>

            <FormGroup legendText="Proportion method drug susceptibility testing (DST)">
              <Stack gap={6} className="indented--group">
                <RadioButtonGroup
                  orientation="vertical"
                  legendText="Isoniazid"
                  name="lab_dst_isonazid"
                  valueSelected={watch("lab_dst_isonazid")}
                  onChange={(evt) => setValue("lab_dst_isonazid", evt)}
                  invalid={errors.lab_dst_isonazid ? true : false}
                  invalidText={errors.lab_dst_isonazid?.message}
                >
                  <RadioButton labelText="resistant" value="resistant" />
                  <RadioButton labelText="susceptible" value="susceptible" />
                  <RadioButton
                    labelText="indeterminate"
                    value="indeterminate"
                  />
                  <RadioButton labelText="Not done" value="not_done" />
                </RadioButtonGroup>

                <RadioButtonGroup
                  orientation="vertical"
                  legendText="Rifampin"
                  name="lab_dst_rifampin"
                  valueSelected={watch("lab_dst_rifampin")}
                  onChange={(evt) => setValue("lab_dst_rifampin", evt)}
                  invalid={errors.lab_dst_rifampin ? true : false}
                  invalidText={errors.lab_dst_rifampin?.message}
                >
                  <RadioButton labelText="resistant" value="resistant" />
                  <RadioButton labelText="susceptible" value="susceptible" />
                  <RadioButton
                    labelText="indeterminate"
                    value="indeterminate"
                  />
                  <RadioButton labelText="Not done" value="not_done" />
                </RadioButtonGroup>

                <RadioButtonGroup
                  orientation="vertical"
                  legendText="Ethambutol"
                  name="lab_dst_ethambutol"
                  valueSelected={watch("lab_dst_ethambutol")}
                  onChange={(evt) => setValue("lab_dst_ethambutol", evt)}
                  invalid={errors.lab_dst_ethambutol ? true : false}
                  invalidText={errors.lab_dst_ethambutol?.message}
                >
                  <RadioButton labelText="resistant" value="resistant" />
                  <RadioButton labelText="susceptible" value="susceptible" />
                  <RadioButton
                    labelText="indeterminate"
                    value="indeterminate"
                  />
                  <RadioButton labelText="Not done" value="not_done" />
                </RadioButtonGroup>

                <RadioButtonGroup
                  orientation="vertical"
                  legendText="Kanamycin"
                  name="lab_dst_kanamycin"
                  valueSelected={watch("lab_dst_kanamycin")}
                  onChange={(evt) => setValue("lab_dst_kanamycin", evt)}
                  invalid={errors.lab_dst_kanamycin ? true : false}
                  invalidText={errors.lab_dst_kanamycin?.message}
                >
                  <RadioButton labelText="resistant" value="resistant" />
                  <RadioButton labelText="susceptible" value="susceptible" />
                  <RadioButton
                    labelText="indeterminate"
                    value="indeterminate"
                  />
                  <RadioButton labelText="Not done" value="not_done" />
                </RadioButtonGroup>

                <RadioButtonGroup
                  orientation="vertical"
                  legendText="Ofloxacin"
                  name="lab_dst_ofloxacin"
                  valueSelected={watch("lab_dst_ofloxacin")}
                  onChange={(evt) => setValue("lab_dst_ofloxacin", evt)}
                  invalid={errors.lab_dst_ofloxacin ? true : false}
                  invalidText={errors.lab_dst_ofloxacin?.message}
                >
                  <RadioButton labelText="resistant" value="resistant" />
                  <RadioButton labelText="susceptible" value="susceptible" />
                  <RadioButton
                    labelText="indeterminate"
                    value="indeterminate"
                  />
                  <RadioButton labelText="Not done" value="not_done" />
                </RadioButtonGroup>

                <RadioButtonGroup
                  orientation="vertical"
                  legendText="LevofloxacineKanamycin"
                  name="lab_dst_levofloxacinekanamycin"
                  valueSelected={watch("lab_dst_levofloxacinekanamycin")}
                  onChange={(evt) =>
                    setValue("lab_dst_levofloxacinekanamycin", evt)
                  }
                  invalid={errors.lab_dst_levofloxacinekanamycin ? true : false}
                  invalidText={errors.lab_dst_levofloxacinekanamycin?.message}
                >
                  <RadioButton labelText="resistant" value="resistant" />
                  <RadioButton labelText="susceptible" value="susceptible" />
                  <RadioButton
                    labelText="indeterminate"
                    value="indeterminate"
                  />
                  <RadioButton labelText="Not done" value="not_done" />
                </RadioButtonGroup>

                <RadioButtonGroup
                  orientation="vertical"
                  legendText="MoxifloxacineKanamycin"
                  name="lab_dst_moxifloxacinekanamycin"
                  valueSelected={watch("lab_dst_moxifloxacinekanamycin")}
                  onChange={(evt) =>
                    setValue("lab_dst_moxifloxacinekanamycin", evt)
                  }
                  invalid={errors.lab_dst_moxifloxacinekanamycin ? true : false}
                  invalidText={errors.lab_dst_moxifloxacinekanamycin?.message}
                >
                  <RadioButton labelText="resistant" value="resistant" />
                  <RadioButton labelText="susceptible" value="susceptible" />
                  <RadioButton
                    labelText="indeterminate"
                    value="indeterminate"
                  />
                  <RadioButton labelText="Not done" value="not_done" />
                </RadioButtonGroup>

                <RadioButtonGroup
                  orientation="vertical"
                  legendText="AmikacineKanamycin"
                  name="lab_dst_amikacinekanamycin"
                  valueSelected={watch("lab_dst_amikacinekanamycin")}
                  onChange={(evt) =>
                    setValue("lab_dst_amikacinekanamycin", evt)
                  }
                  invalid={errors.lab_dst_amikacinekanamycin ? true : false}
                  invalidText={errors.lab_dst_amikacinekanamycin?.message}
                >
                  <RadioButton labelText="resistant" value="resistant" />
                  <RadioButton labelText="susceptible" value="susceptible" />
                  <RadioButton
                    labelText="indeterminate"
                    value="indeterminate"
                  />
                  <RadioButton labelText="Not done" value="not_done" />
                </RadioButtonGroup>

                {DSTFields.some((field) => field !== NOT_DONE) && (
                  <Fragment>
                    <DatePicker
                      control={control}
                      labelText="Date"
                      id="lab_dst_date"
                      invalid={errors.lab_dst_date ? true : false}
                      invalidText={errors.lab_dst_date?.message}
                    />

                    <TextInput
                      id="lab_dst_done_by"
                      labelText="Done by"
                      {...register("lab_dst_done_by")}
                      invalid={errors.lab_dst_done_by ? true : false}
                      invalidText={errors.lab_dst_done_by?.message}
                    />
                  </Fragment>
                )}
              </Stack>
            </FormGroup>

            {!isCreating || isUpdating ? (
              <Button kind={isUpdate ? "secondary" : "primary"} type="submit">
                {isUpdate ? "Update" : "Save"}
              </Button>
            ) : (
              <InlineLoading
                status="active"
                iconDescription="Active loading indicator"
                description="Loading data..."
              />
            )}
          </Stack>
        </Form>
      </Column>
      <Modal
        size="sm"
        open={prompt}
        modalHeading="Positive result!"
        modalLabel="Alert"
        primaryButtonText="Confirm"
        secondaryButtonText="Cancel"
        preventCloseOnClickOutside
        onRequestClose={() => setPrompt(false)}
        onRequestSubmit={() => confirmResult()}
      >
        <p>You are about to record a positive result</p>
      </Modal>
    </FlexGrid>
  );
};

export default LabResults;
