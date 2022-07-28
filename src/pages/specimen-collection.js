import React, { Fragment, useEffect } from "react";
import toast from "react-hot-toast";
import { PageHeader, Spacer, TabBar, DatePicker } from "components";
import {
  Stack,
  Form,
  Button,
  Column,
  FormGroup,
  TextInput,
  RadioButton,
  FormLabel,
  RadioButtonGroup,
  InlineNotification,
  InlineLoading,
  FlexGrid,
  Loading,
} from "@carbon/react";
import { PillsAdd } from "@carbon/icons-react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { SPECIMEN_COLLECTION_SCHEMA } from "schemas";
import { useSelector } from "react-redux";
import { recordSelector } from "features";
import {
  useGetSpecimensQuery,
  useNewSpecimenMutation,
  useUpdateSpecimenMutation,
} from "services";
import { useNavigate } from "react-router-dom";

const SpecimenCollection = () => {
  const record = useSelector(recordSelector);
  const navigate = useNavigate();
  const [newSpecimen, { isLoading: isCreating }] = useNewSpecimenMutation();
  const [updateSpecimen, { isLoading: isUpdating }] =
    useUpdateSpecimenMutation();
  const {
    data: specimens = [],
    isFetching,
    refetch,
  } = useGetSpecimensQuery(record.record_id, {
    refetchOnMountOrArgChange: true,
  });

  const isUpdate = specimens[0]?.specimen_collection_id ? true : false;

  const {
    reset,
    watch,
    control,
    setValue,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: SPECIMEN_COLLECTION_SCHEMA.cast(),
    resolver: yupResolver(SPECIMEN_COLLECTION_SCHEMA),
  });

  const specimenOneType = watch(
    "specimen_collection_1_specimen_collection_type",
    "sputum"
  );

  const specimenTwoType = watch(
    "specimen_collection_2_specimen_collection_type",
    "sputum"
  );

  useEffect(() => {
    if (specimens.length) {
      reset(specimens[0]);
    }
  }, [specimens, reset]);

  useEffect(() => {
    Array.prototype.forEach.call(
      document.querySelectorAll("input[type=text],textarea"),
      function (input) {
        input.addEventListener("keyup", function () {
          input.value = input.value.toUpperCase();
        });
      }
    );
  });

  async function handleSpecimenCreation(data) {
    const request = {
      ...data,
      record_id: record.record_id,
    };
    try {
      await newSpecimen(request).unwrap();
      toast.success("specimen created");
      navigate("/dashboard");
    } catch (error) {
      // we handle errors with middleware
    }
  }

  async function handleSpecimenUpdate(data) {
    try {
      await updateSpecimen(data).unwrap();
      toast.success("specimen updated");
      refetch();
    } catch (error) {
      // we handle errors with middleware
    }
  }

  return (
    <FlexGrid fullWidth className="page">
      <Column sm={4} lg={{ span: 8, offset: 4 }}>
        <TabBar />
        <PageHeader
          title="Specimen collection"
          description="Manage and update specimen collections"
          renderIcon={<PillsAdd size={42} />}
        />
        <Spacer h={7} />
        {isFetching ? (
          <Loading />
        ) : (
          <Fragment>
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
                  ? handleSubmit(handleSpecimenUpdate)
                  : handleSubmit(handleSpecimenCreation)
              }
            >
              <Stack gap={7}>
                <FormGroup legendText="Collection 1" hidden={isUpdate}>
                  <Stack gap={7}>
                    <DatePicker
                      control={control}
                      labelText="Date"
                      id="specimen_collection_1_date"
                      invalid={errors.specimen_collection_1_date ? true : false}
                      invalidText={errors.specimen_collection_1_date?.message}
                    />

                    <FormGroup legendText="Specimen type">
                      <Stack gap={7}>
                        <RadioButtonGroup
                          orientation="vertical"
                          legendText="Type"
                          name="specimen_collection_1_specimen_collection_type"
                          valueSelected={watch(
                            "specimen_collection_1_specimen_collection_type"
                          )}
                          onChange={(evt) =>
                            setValue(
                              "specimen_collection_1_specimen_collection_type",
                              evt
                            )
                          }
                        >
                          <RadioButton labelText="sputum" value="sputum" />
                          <RadioButton labelText="CSF" value="csf" id="csf" />
                          <RadioButton
                            labelText="Lymph node aspirate"
                            value="lymph_node_aspirate"
                          />
                          <RadioButton
                            labelText="Gastric aspirate"
                            value="gastric_aspirate"
                          />
                          <RadioButton labelText="Urine" value="urine" />
                          <RadioButton labelText="Abscess" value="abscess" />
                          <RadioButton
                            labelText="Bronchoalveolar aspirate"
                            value="bronchoalveolar_aspirate"
                          />
                          <RadioButton
                            labelText="Isolate from sputum"
                            value="isolate_from_sputum"
                          />
                          <RadioButton
                            labelText="Isolate from specimen not sputum"
                            value="isolate_from_specimen_not_sputum"
                          />
                          <RadioButton
                            labelText="Pleural fluid"
                            value="pleural_fluid"
                          />
                          <RadioButton labelText="unknown" value="unknown" />
                          <RadioButton labelText="other" value="other" />
                        </RadioButtonGroup>

                        {specimenOneType === "other" && (
                          <TextInput
                            id="specimen_collection_1_other"
                            labelText="Enter other"
                            {...register("specimen_collection_1_other")}
                            invalid={
                              errors.specimen_collection_1_other ? true : false
                            }
                            invalidText={
                              errors.specimen_collection_1_other?.message
                            }
                          />
                        )}

                        {specimenOneType === "sputum" && (
                          <Fragment>
                            <RadioButtonGroup
                              legendText="Period"
                              name="specimen_collection_1_period"
                              valueSelected={watch(
                                "specimen_collection_1_period"
                              )}
                              onChange={(evt) =>
                                setValue("specimen_collection_1_period", evt)
                              }
                            >
                              <RadioButton
                                labelText="Spot"
                                value="spot"
                                id="spot"
                              />
                              <RadioButton
                                labelText="Morning"
                                value="morning"
                                id="morning"
                              />
                              <RadioButton
                                labelText="N/A"
                                value="n_a"
                                id="n_a"
                              />
                            </RadioButtonGroup>

                            <RadioButtonGroup
                              orientation="vertical"
                              legendText="Aspect"
                              name="specimen_collection_1_aspect"
                              valueSelected={watch(
                                "specimen_collection_1_aspect"
                              )}
                              onChange={(evt) =>
                                setValue("specimen_collection_1_aspect", evt)
                              }
                            >
                              <RadioButton
                                labelText="Mucopurulent"
                                value="mucopurulent"
                                id="mucopurulent"
                              />
                              <RadioButton
                                labelText="Bloody"
                                value="bloody"
                                id="bloody"
                              />
                              <RadioButton
                                labelText="Salivary"
                                value="salivary"
                                id="salivary"
                              />
                              <RadioButton
                                labelText="N/A"
                                value="n_a"
                                id="n_a2"
                              />
                            </RadioButtonGroup>
                          </Fragment>
                        )}
                      </Stack>
                    </FormGroup>

                    <TextInput
                      id="specimen_collection_1_received_by"
                      labelText="Received by"
                      {...register("specimen_collection_1_received_by")}
                      invalid={
                        errors.specimen_collection_1_received_by ? true : false
                      }
                      invalidText={
                        errors.specimen_collection_1_received_by?.message
                      }
                    />
                  </Stack>
                </FormGroup>
                {isUpdate && (
                  <InlineNotification
                    lowContrast
                    kind="info"
                    title="Alert"
                    subtitle="Only Collection 2 can be updated"
                  />
                )}
                <FormGroup legendText="Collection 2">
                  <Stack gap={7}>
                    <DatePicker
                      control={control}
                      labelText="Date"
                      id="specimen_collection_2_date"
                      invalid={errors.specimen_collection_2_date ? true : false}
                      invalidText={errors.specimen_collection_2_date?.message}
                    />

                    <FormGroup legendText="Specimen type">
                      <Stack gap={7}>
                        <RadioButtonGroup
                          orientation="vertical"
                          legendText="Type"
                          name="specimen_collection_2_specimen_collection_type"
                          valueSelected={watch(
                            "specimen_collection_2_specimen_collection_type"
                          )}
                          onChange={(evt) =>
                            setValue(
                              "specimen_collection_2_specimen_collection_type",
                              evt
                            )
                          }
                        >
                          <RadioButton labelText="sputum" value="sputum" />
                          <RadioButton labelText="CSF" value="csf" id="csf" />
                          <RadioButton
                            labelText="Lymph node aspirate"
                            value="lymph_node_aspirate"
                          />
                          <RadioButton
                            labelText="Gastric aspirate"
                            value="gastric_aspirate"
                          />
                          <RadioButton labelText="Urine" value="urine" />
                          <RadioButton labelText="Abscess" value="abscess" />
                          <RadioButton
                            labelText="Bronchoalveolar aspirate"
                            value="bronchoalveolar_aspirate"
                          />
                          <RadioButton
                            labelText="Isolate from sputum"
                            value="isolate_from_sputum"
                          />
                          <RadioButton
                            labelText="Isolate from specimen not sputum"
                            value="isolate_from_specimen_not_sputum"
                          />
                          <RadioButton
                            labelText="Pleural fluid"
                            value="pleural_fluid"
                          />
                          <RadioButton labelText="unknown" value="unknown" />
                          <RadioButton labelText="other" value="other" />
                        </RadioButtonGroup>

                        {specimenTwoType === "other" && (
                          <TextInput
                            id="specimen_collection_2_other"
                            labelText="Enter other"
                            {...register("specimen_collection_2_other")}
                            invalid={
                              errors.specimen_collection_2_other ? true : false
                            }
                            invalidText={
                              errors.specimen_collection_2_other?.message
                            }
                          />
                        )}

                        {specimenTwoType === "sputum" && (
                          <Fragment>
                            <RadioButtonGroup
                              legendText="Period"
                              name="specimen_collection_2_period"
                              valueSelected={watch(
                                "specimen_collection_2_period"
                              )}
                              onChange={(evt) =>
                                setValue("specimen_collection_2_period", evt)
                              }
                            >
                              <RadioButton labelText="Spot" value="spot" />
                              <RadioButton
                                labelText="Morning"
                                value="morning"
                              />
                              <RadioButton labelText="N/A" value="n_a" />
                            </RadioButtonGroup>

                            <RadioButtonGroup
                              orientation="vertical"
                              legendText="Aspect"
                              name="specimen_collection_2_aspect"
                              valueSelected={watch(
                                "specimen_collection_2_aspect"
                              )}
                              onChange={(evt) =>
                                setValue("specimen_collection_2_aspect", evt)
                              }
                            >
                              <RadioButton
                                labelText="Mucopurulent"
                                value="mucopurulent"
                              />
                              <RadioButton labelText="Bloody" value="bloody" />
                              <RadioButton
                                labelText="Salivary"
                                value="salivary"
                              />
                              <RadioButton labelText="N/A" value="n_a" />
                            </RadioButtonGroup>
                          </Fragment>
                        )}
                      </Stack>
                    </FormGroup>

                    <TextInput
                      id="specimen_collection_2_received_by"
                      labelText="Received by"
                      {...register("specimen_collection_2_received_by")}
                      invalid={
                        errors.specimen_collection_2_received_by ? true : false
                      }
                      invalidText={
                        errors.specimen_collection_2_received_by?.message
                      }
                    />
                  </Stack>
                </FormGroup>

                {!isCreating || isUpdating ? (
                  <Button
                    kind={isUpdate ? "secondary" : "primary"}
                    type="submit"
                  >
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
          </Fragment>
        )}
      </Column>
    </FlexGrid>
  );
};

export default SpecimenCollection;
