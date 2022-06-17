# CHPR-IS Form Validation

Input checks and conditions for data collection

- [CHPR-IS Form Validation](#chpr-is-form-validation)
  - [Records](#records)
    - [1. Create record](#1-create-record)
    - [2. Create specimen collection](#2-create-specimen-collection)
    - [3. Create lab](#3-create-lab)
    - [4. Create follow up](#4-create-follow-up)
    - [5. Create outcome recorded](#5-create-outcome-recorded)
    - [6. Create tb treatment outcome](#6-create-tb-treatment-outcome)

---

## Records

Records endpoints

### 1. Create record

Create a new record.

**_Schema:_**

```js
{
    "records_name":"string" required,
    "records_age":"integer" required,
    "records_sex":"string", required
    "records_date_of_test_request":"date", required
    "records_address":"string",required
    "records_telephone":"string", required
    "records_telephone_2":"string",
    "records_has_art_unique_code":"string", required
    "records_art_unique_code":"string", required if records_has_art_unique_code === "yes"
    "records_status":"string", required
    "records_ward_bed_number":"string", required if records_status === "ward-bed"
    "records_currently_pregnant":"string", required "yes" option disabled if records_sex === "male"
    "records_symptoms_current_cough":"boolean",
    "records_symptoms_fever":"boolean",
    "records_symptoms_night_sweats":"boolean",
    "records_symptoms_weight_loss":"boolean",
    "records_symptoms_none_of_the_above":"boolean",
    "records_patient_category_hospitalized":"boolean",
    "records_patient_category_child":"boolean",
    "records_patient_category_to_initiate_art":"boolean",
    "records_patient_category_on_art_symptomatic":"boolean",
    "records_patient_category_outpatient":"boolean",
    "records_patient_category_anc":"boolean",
    "records_patient_category_diabetes_clinic":"boolean",
    "records_patient_category_other":"string",
    "records_reason_for_test_presumptive_tb":"boolean",
    "records_tb_treatment_history":"string",
    "records_tb_treatment_history_contact_of_tb_patient":"string"
}
```

### 2. Create specimen collection

Create a new specimen collection for a record.

**_Schema_**

```js
{
    "specimen_collection_1_date":"date", required
    "specimen_collection_1_specimen_collection_type":"string" required,
    "specimen_collection_1_other":"string" required if specimen_collection_1_specimen_collection_type === "other",
    "specimen_collection_1_period":"string", required if specimen_collection_1_specimen_collection_type === "sputum",
    "specimen_collection_1_aspect":"string", required if specimen_collection_1_specimen_collection_type === "sputum",
    "specimen_collection_1_received_by":"string" required,

    "specimen_collection_2_date":"string" required,
    "specimen_collection_2_specimen_collection_type":"string" required,
    "specimen_collection_2_other":"string" required if specimen_collection_2_specimen_collection_type === "other",
    "specimen_collection_2_period":"string", required if specimen_collection_2_specimen_collection_type === "sputum",
    "specimen_collection_2_aspect":"string" required if specimen_collection_2_specimen_collection_type === "sputum",
    "specimen_collection_2_received_by":"string" required
}
```

### 3. Create lab

Create a new labs for a record.

**_Schema_**

```js
{
    "lab_date_specimen_collection_received":"date" required,
    "lab_received_by":"string" required,
    "lab_registration_number":"string" required,
    "lab_smear_microscopy_result_result_1":"string" required,
    "lab_smear_microscopy_result_result_2":"string" disabled if lab_smear_microscopy_result_result_1 === "not_done" ,
    "lab_smear_microscopy_result_date":"string" required if lab_smear_microscopy_result_result_1 !== "not_done" ,
    "lab_smear_microscopy_result_done_by":"string", required if lab_smear_microscopy_result_result_1 !== "not_done" ,
    "lab_xpert_mtb_rif_assay_result":"string" required,
    "lab_xpert_mtb_rif_assay_grades":"string" required if lab_xpert_mtb_rif_assay_result !== "not_done",
    "lab_xpert_mtb_rif_assay_rif_result":"string" required if lab_xpert_mtb_rif_assay_result !== "not_done",
    "lab_xpert_mtb_rif_assay_date":"string" required if lab_xpert_mtb_rif_assay_result !== "not_done" ,
    "lab_xpert_mtb_rif_assay_done_by":"string" required if lab_xpert_mtb_rif_assay_result !== "not_done",
    "lab_urine_lf_lam_result":"string" required,
    "lab_urine_lf_lam_date":"string" required if lab_urine_lf_lam_result !== "not_done",,
    "lab_urine_lf_lam_done_by":"string" required if lab_urine_lf_lam_result !== "not_done",
}
```

### 4. Create follow up

Create a new follow-up for a record.

**_Schema_**

```js
{
    "follow_up_xray":"boolean" required,
    "follow_up_amoxicillin":"boolean" required,
    "follow_up_other_antibiotic":"string",
    "follow_up_schedule_date":"date" required,
    "follow_up_comments":"string"
}
```

### 5. Create outcome recorded

Create a new outcome recorded for a record.

**_Schema_**

```js
{
    "outcome_recorded_started_tb_treatment_outcome":"string",
    "outcome_recorded_tb_rx_number":"string",
    "outcome_recorded_other":"string",
    "outcome_recorded_comments":"string"
}
```

### 6. Create tb treatment outcome

Create a new tb treatment outcome for a record.

**_Schema_**

```js
{
    "tb_treatment_outcome_result":"string",
    "tb_treatment_outcome_comments":"string",
    "tb_treatment_outcome_close_patient_file":"string"
}
```

---

[Back to top](#chpr-is-api-references)
