// helper utils

// use to register custom fields with react-hook-form
export function handleSetValue(key, value, cb) {
  cb(key, value, {
    shouldValidate: true,
  });
}

export function getResultType(data) {
  // For what should be considered as a positive result, we have:
  // 1. For Microscopy: Scanty, 1+, 2+,3+.
  // 2. For Xpert : MTB Detected High, Medium, Low, Very Low and Trace.
  // 3. For Urine Lam: Positive.

  const POSITIVE = "positive";
  const NEGATIVE = "negative";
  const NOT_DONE = "not_done";
  const positiveMicroscopy = ["scanty", "1+", "2+", "3+"];
  const positiveXpert = [
    "detected",
    "trace",
    "high",
    "medium",
    "low",
    "very_low",
  ];

  let {
    lab_smear_microscopy_result_result_1,
    lab_smear_microscopy_result_result_2,
    lab_xpert_mtb_rif_assay_result,
    lab_xpert_mtb_rif_assay_grades,
    lab_xpert_mtb_rif_assay_rif_result,
    lab_urine_lf_lam_result,
    lab_xpert_mtb_rif_assay_grades_2,
    lab_xpert_mtb_rif_assay_rif_result_2,
    lab_xpert_mtb_rif_assay_result_2,
  } = data;

  let result = null;

  // determine result type
  if (
    positiveMicroscopy.includes(lab_smear_microscopy_result_result_1) ||
    positiveMicroscopy.includes(lab_smear_microscopy_result_result_2)
  ) {
    result = POSITIVE;
  } else if (
    positiveXpert.includes(lab_xpert_mtb_rif_assay_result) ||
    positiveXpert.includes(lab_xpert_mtb_rif_assay_rif_result) ||
    positiveXpert.includes(lab_xpert_mtb_rif_assay_grades) ||
    positiveXpert.includes(lab_xpert_mtb_rif_assay_result_2) ||
    positiveXpert.includes(lab_xpert_mtb_rif_assay_rif_result_2) ||
    positiveXpert.includes(lab_xpert_mtb_rif_assay_grades_2)
  ) {
    result = POSITIVE;
  } else if (lab_urine_lf_lam_result === POSITIVE) {
    result = POSITIVE;
  } else if (
    lab_smear_microscopy_result_result_1 === NOT_DONE &&
    lab_smear_microscopy_result_result_2 === NOT_DONE &&
    lab_xpert_mtb_rif_assay_result === NOT_DONE &&
    lab_xpert_mtb_rif_assay_rif_result === NOT_DONE &&
    lab_urine_lf_lam_result === NOT_DONE
  ) {
    result = NOT_DONE;
  } else {
    result = NEGATIVE;
  }

  return result;
}
