import React, { Fragment, useEffect } from "react";
import { PageHeader, Spacer, TabBar, DatePicker } from "components";
import {
  Stack,
  Form,
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
} from "@carbon/react";
import { Hospital } from "@carbon/icons-react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { LAB_RESULTS_SCHEMA } from "schemas";
import { useSelector } from "react-redux";
import { recordSelector } from "features";
import {
  useGetLabResultsQuery,
  useNewLabResultMutation,
  useUpdateLabResultMutation,
} from "services";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const LabResults = () => {
  const record = useSelector(recordSelector);
  const navigate = useNavigate();
  const [newLabResult, { isLoading: isCreating }] = useNewLabResultMutation();
  const [updateLabResult, { isLoading: isUpdating }] =
    useUpdateLabResultMutation();
  const {
    data: results = [],
    isFetching,
    refetch,
  } = useGetLabResultsQuery(record.record_id);
  const isUpdate = results[0]?.lab_id ? true : false;

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

  const isResultOneDone =
    watch("lab_smear_microscopy_result_result_1", "not_done") !== "not_done";
  const MTBResult = watch("lab_xpert_mtb_rif_assay_result", "not_done");
  const isLFDone = watch("lab_urine_lf_lam_result", "not_done") !== "not_done";

  useEffect(() => {
    if (results.length) {
      reset(results[0]);
    }
  }, [results, reset]);

  async function handleResultCreation(data) {
    const request = {
      ...data,
      record_id: record.record_id,
    };

    try {
      await newLabResult(request).unwrap();
      toast.success("Lab result recorded");
      navigate("/dashboard");
    } catch (error) {
      // we handle errors with middleware
    }
  }

  async function handleResultUpdate(data) {
    try {
      await updateLabResult(data).unwrap();
      toast.success("Lab result updated");
      refetch();
    } catch (error) {
      // we handle errors with middleware
    }
  }

  if (isFetching) return <Loading />;

  return (
    <FlexGrid fullWidth className="page">
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
        <Form
          onSubmit={
            isUpdate
              ? handleSubmit(handleResultUpdate)
              : handleSubmit(handleResultCreation)
          }
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
                  defaultSelected={
                    results[0]?.lab_smear_microscopy_result_result_1 ||
                    "not_done"
                  }
                  onChange={(evt) =>
                    setValue("lab_smear_microscopy_result_result_1", evt)
                  }
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
                      defaultSelected={
                        results[0]?.lab_smear_microscopy_result_result_2 ||
                        "not_done"
                      }
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
                  defaultSelected={
                    results[0]?.lab_xpert_mtb_rif_assay_result || "not_done"
                  }
                  onChange={(evt) =>
                    setValue("lab_xpert_mtb_rif_assay_result", evt)
                  }
                >
                  <RadioButton labelText="Detected" value="detected" />
                  <RadioButton labelText="Trace" value="trace" id="trace" />
                  <RadioButton labelText="Not detected" value="not_detected" />
                  <RadioButton
                    labelText="Error/invalid"
                    value="error_invalid"
                  />
                  <RadioButton labelText="Not done" value="not_done" />
                </RadioButtonGroup>

                {MTBResult === "detected" && (
                  <Fragment>
                    <RadioButtonGroup
                      orientation="vertical"
                      legendText="Grades"
                      name="lab_xpert_mtb_rif_assay_grades"
                      defaultSelected={
                        results[0]?.lab_xpert_mtb_rif_assay_grades || "very_low"
                      }
                      onChange={(evt) =>
                        setValue("lab_xpert_mtb_rif_assay_grades", evt)
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
                    </RadioButtonGroup>

                    <RadioButtonGroup
                      orientation="vertical"
                      legendText="RIF result"
                      name="lab_xpert_mtb_rif_assay_rif_result"
                      defaultSelected={
                        results[0]?.lab_xpert_mtb_rif_assay_rif_result ||
                        "not_done"
                      }
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

                {MTBResult !== "not_done" && (
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

            <FormGroup legendText="Culture">
              <Stack gap={7}>
                <RadioButtonGroup
                  orientation="vertical"
                  legendText="MGIT Culture"
                  name="lab_culture_mgit_culture"
                  defaultSelected={
                    results[0]?.lab_culture_mgit_culture || "not_done"
                  }
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
                  defaultSelected={
                    results[0]?.lab_culture_lj_culture || "not_done"
                  }
                  onChange={(evt) => setValue("lab_culture_lj_culture", evt)}
                >
                  <RadioButton labelText="NTM" value="ntm" />
                  <RadioButton labelText="TBC" value="tbc" />
                  <RadioButton labelText="Negative" value="negative" />
                  <RadioButton labelText="Contaminated" value="contaminated" />
                  <RadioButton labelText="Not done" value="not_done" />
                </RadioButtonGroup>
              </Stack>
            </FormGroup>

            <FormGroup legendText="Line probe assay (LPA)">
              <p className="form--group__description">
                TB drug susceptibility testing (DST)
              </p>
              <br />
              <Stack gap={7} className="indented--group">
                <FormGroup legendText="First line LPA (MTBDRplus)">
                  <Stack gap={6}>
                    <RadioButtonGroup
                      orientation="vertical"
                      legendText="Isoniazid"
                      name="lab_lpa_mtbdrplus_isoniazid"
                      defaultSelected={results[0]?.lab_lpa_mtbdrplus_isoniazid}
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
                    </RadioButtonGroup>

                    <RadioButtonGroup
                      orientation="vertical"
                      legendText="Rifampin"
                      name="lab_lpa_mtbdrplus_rifampin"
                      defaultSelected={results[0]?.lab_lpa_mtbdrplus_rifampin}
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
                    </RadioButtonGroup>
                  </Stack>
                </FormGroup>

                <FormGroup legendText="Second line LPA (MTBDRsl)">
                  <Stack gap={6}>
                    <RadioButtonGroup
                      orientation="vertical"
                      legendText="Flouoroquinolones"
                      name="lab_lpa_mtbdrs_flouoroquinolones"
                      defaultSelected={
                        results[0]?.lab_lpa_mtbdrs_flouoroquinolones
                      }
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
                    </RadioButtonGroup>

                    <RadioButtonGroup
                      orientation="vertical"
                      legendText="Kanamycin"
                      name="lab_lpa_mtbdrs_kanamycin"
                      defaultSelected={results[0]?.lab_lpa_mtbdrs_kanamycin}
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
                    </RadioButtonGroup>

                    <RadioButtonGroup
                      orientation="vertical"
                      legendText="Amikacin"
                      name="lab_lpa_mtbdrs_amikacin"
                      defaultSelected={results[0]?.lab_lpa_mtbdrs_amikacin}
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
                    </RadioButtonGroup>

                    <RadioButtonGroup
                      orientation="vertical"
                      legendText="Capreomycin"
                      name="lab_lpa_mtbdrs_capreomycin"
                      defaultSelected={results[0]?.lab_lpa_mtbdrs_capreomycin}
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
                    </RadioButtonGroup>

                    <RadioButtonGroup
                      orientation="vertical"
                      legendText="Low-level Kanamycin"
                      name="lab_lpa_mtbdrs_low_level_kanamycin"
                      defaultSelected={
                        results[0]?.lab_lpa_mtbdrs_low_level_kanamycin
                      }
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
                    </RadioButtonGroup>
                  </Stack>
                </FormGroup>
              </Stack>
            </FormGroup>

            <FormGroup legendText="Proportion method drug susceptibility testing (DST) ">
              <Stack gap={6} className="indented--group">
                <RadioButtonGroup
                  orientation="vertical"
                  legendText="Isoniazid"
                  name="lab_dst_isonazid"
                  defaultSelected={results[0]?.lab_dst_isonazid}
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
                </RadioButtonGroup>

                <RadioButtonGroup
                  orientation="vertical"
                  legendText="Rifampin"
                  name="lab_dst_rifampin"
                  defaultSelected={results[0]?.lab_dst_rifampin}
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
                </RadioButtonGroup>

                <RadioButtonGroup
                  orientation="vertical"
                  legendText="Ethambutol"
                  name="lab_dst_ethambutol"
                  defaultSelected={results[0]?.lab_dst_ethambutol}
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
                </RadioButtonGroup>

                <RadioButtonGroup
                  orientation="vertical"
                  legendText="Kanamycin"
                  name="lab_dst_kanamycin"
                  defaultSelected={results[0]?.lab_dst_kanamycin}
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
                </RadioButtonGroup>

                <RadioButtonGroup
                  orientation="vertical"
                  legendText="Ofloxacin"
                  name="lab_dst_ofloxacin"
                  defaultSelected={results[0]?.lab_dst_ofloxacin}
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
                </RadioButtonGroup>

                <RadioButtonGroup
                  orientation="vertical"
                  legendText="LevofloxacineKanamycin"
                  name="lab_dst_levofloxacinekanamycin"
                  defaultSelected={results[0]?.lab_dst_levofloxacinekanamycin}
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
                </RadioButtonGroup>

                <RadioButtonGroup
                  orientation="vertical"
                  legendText="MoxifloxacineKanamycin"
                  name="lab_dst_moxifloxacinekanamycin"
                  defaultSelected={results[0]?.lab_dst_moxifloxacinekanamycin}
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
                </RadioButtonGroup>

                <RadioButtonGroup
                  orientation="vertical"
                  legendText="AmikacineKanamycin"
                  name="lab_dst_amikacinekanamycin"
                  defaultSelected={results[0]?.lab_dst_amikacinekanamycin}
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
                </RadioButtonGroup>
              </Stack>
            </FormGroup>

            <FormGroup legendText="Urine LF-LAM">
              <Stack gap={7}>
                <RadioButtonGroup
                  orientation="vertical"
                  legendText=""
                  name="lab_urine_lf_lam_result"
                  defaultSelected={
                    results[0]?.lab_urine_lf_lam_result || "not_done"
                  }
                  onChange={(evt) => setValue("lab_urine_lf_lam_result", evt)}
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
    </FlexGrid>
  );
};

export default LabResults;
