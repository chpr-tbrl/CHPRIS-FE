import React from "react";
import { PageHeader, Spacer, TabBar } from "components";
import { Button, FormLabel, FlexGrid, Row, Column } from "@carbon/react";
import { useSelector } from "react-redux";
import { recordSelector } from "features";
import { Person } from "@carbon/icons-react";

const RecordDetails = () => {
  const record = useSelector(recordSelector);
  return (
    <FlexGrid fullWidth className="page">
      <Column sm={4} lg={{ span: 8, offset: 4 }}>
        <TabBar />
        <PageHeader
          title="Information"
          description="Manage and update record information"
          renderIcon={<Person size={42} />}
        />
        <Row>
          <Column>
            <FormLabel>Id</FormLabel>
            <p>{record.record_id + "" || "N/A"}</p>
            <Spacer h={5} />
            <FormLabel>Patient's name</FormLabel>
            <p>{record.records_name + "" || "N/A"}</p>
            <Spacer h={5} />
            <FormLabel>Age</FormLabel>
            <p>{record.records_age + "" || "N/A"}</p>
            <Spacer h={5} />
            <FormLabel>Sex</FormLabel>
            <p>{record.records_sex + "" || "N/A"}</p>
            <Spacer h={5} />

            <FormLabel>date_of_test_request</FormLabel>
            <p>{record.records_date_of_test_request + "" || "N/A"}</p>
            <Spacer h={5} />

            <FormLabel>address</FormLabel>
            <p>{record.records_address + "" || "N/A"}</p>
            <Spacer h={5} />

            <FormLabel>telephone</FormLabel>
            <p>{record.records_telephone + "" || "N/A"}</p>
            <Spacer h={5} />

            <FormLabel>telephone_2</FormLabel>
            <Spacer h={5} />

            <FormLabel>has_art_unique_code</FormLabel>
            <p>{record.records_has_art_unique_code + "" || "N/A"}</p>
            <Spacer h={5} />

            <FormLabel>art_unique_code</FormLabel>
            <p>{record.records_art_unique_code + "" || "N/A"}</p>
            <Spacer h={5} />

            <FormLabel>status</FormLabel>
            <p>{record.records_status + "" || "N/A"}</p>
            <Spacer h={5} />

            <FormLabel>ward_bed_number</FormLabel>
            <p>{record.records_ward_bed_number + "" || "N/A"}</p>
            <Spacer h={5} />

            <FormLabel>currently_pregnant</FormLabel>
            <p>{record.records_currently_pregnant + "" || "N/A"}</p>
            <Spacer h={5} />
          </Column>
          <Column>
            <FormLabel>symptoms_current_cough</FormLabel>
            <p>{record.records_symptoms_current_cough + "" || "N/A"}</p>
            <Spacer h={5} />

            <FormLabel>symptoms_fever</FormLabel>
            <p>{record.records_symptoms_fever + "" || "N/A"}</p>
            <Spacer h={5} />

            <FormLabel>symptoms_night_sweats</FormLabel>
            <p>{record.records_symptoms_night_sweats + "" || "N/A"}</p>
            <Spacer h={5} />

            <FormLabel>symptoms_weight_loss</FormLabel>
            <p>{record.records_symptoms_weight_loss + "" || "N/A"}</p>
            <Spacer h={5} />

            <FormLabel>symptoms_none_of_the_above</FormLabel>
            <p>{record.records_symptoms_none_of_the_above + "" || "N/A"}</p>
            <Spacer h={5} />

            <FormLabel>patient_category_hospitalized</FormLabel>
            <p>{record.records_patient_category_hospitalized + "" || "N/A"}</p>
            <Spacer h={5} />

            <FormLabel>patient_category_child</FormLabel>
            <p>{record.records_patient_category_child + "" || "N/A"}</p>
            <Spacer h={5} />

            <FormLabel>patient_category_to_initiate_art</FormLabel>
            <p>
              {record.records_patient_category_to_initiate_art + "" || "N/A"}
            </p>
            <Spacer h={5} />

            <FormLabel>patient_category_on_art_symptomatic</FormLabel>
            <p>
              {record.records_patient_category_on_art_symptomatic + "" || "N/A"}
            </p>
            <Spacer h={5} />

            <FormLabel>patient_category_outpatient</FormLabel>
            <p>{record.records_patient_category_outpatient + "" || "N/A"}</p>
            <Spacer h={5} />

            <FormLabel>patient_category_anc</FormLabel>
            <p>{record.records_patient_category_anc + "" || "N/A"}</p>
            <Spacer h={5} />

            <p>
              {record.records_patient_category_diabetes_clinic + "" || "N/A"}
            </p>
            <FormLabel>patient_category_diabetes_clinic</FormLabel>
            <Spacer h={5} />

            <FormLabel>patient_category_other</FormLabel>
            <p>{record.records_patient_category_other + "" || "N/A"}</p>
            <Spacer h={5} />

            <FormLabel>reason_for_test_presumptive_tb</FormLabel>
            <p>{record.records_reason_for_test_presumptive_tb + "" || "N/A"}</p>
            <Spacer h={5} />

            <FormLabel>tb_treatment_history</FormLabel>
            <p>{record.records_tb_treatment_history + "" || "N/A"}</p>
            <Spacer h={5} />

            <FormLabel>
              records_tb_treatment_history_contact_of_tb_patient
            </FormLabel>
            <p>
              {record.records_tb_treatment_history_contact_of_tb_patient + "" ||
                "N/A"}
            </p>
            <Spacer h={5} />
          </Column>
        </Row>
        <Row>
          <Column>
            <Button>Edit record</Button>
          </Column>
        </Row>
      </Column>
    </FlexGrid>
  );
};

export default RecordDetails;
