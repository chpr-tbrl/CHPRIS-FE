import React, { useRef, useState, Fragment, useMemo } from "react";
import {
  Row,
  Form,
  Stack,
  Button,
  Column,
  Loading,
  FlexGrid,
  Dropdown,
  FormGroup,
  DatePicker,
  InlineLoading,
  DatePickerInput,
  DropdownSkeleton,
  InlineNotification,
} from "@carbon/react";

import { WatsonHealthDownloadStudy } from "@carbon/icons-react";
import { ADMIN, DATA_EXPORT_SCHEMA, SUPER_ADMIN } from "schemas";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDataExportMutation } from "services";
import { format, subMonths, startOfMonth, endOfMonth } from "date-fns";
import { useSelector } from "react-redux";
import { authSelector } from "features";
import { handleSetValue, getRegions, getSites } from "utils";
import { PageHeader, Spacer, TabBar } from "components";
import { useDeviceDetection, useProfile } from "hooks";
import { useGetRegionsQuery, useGetSitesQuery } from "services";
import toast from "react-hot-toast";

const DataExport = () => {
  const downloadRef = useRef(null);
  const isMobile = useDeviceDetection();
  const auth = useSelector(authSelector);
  const { account, fetchingProfile } = useProfile(auth.uid);
  const isPriviledgedUser =
    account.account_type === (SUPER_ADMIN || ADMIN) ? true : false;
  const [dataExport, { isLoading: isExporting }] = useDataExportMutation();
  const {
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(DATA_EXPORT_SCHEMA),
  });

  const [regionId, setRegionId] = useState(null);
  const { data: regions = [], isLoading: loadingRegions } = useGetRegionsQuery(
    null,
    {
      skip: !isPriviledgedUser,
      refetchOnMountOrArgChange: true,
    }
  );
  const { data: sites = [], isLoading: loadingSites } = useGetSitesQuery(
    regionId,
    {
      skip:
        !regionId || regionId === "all" || !isPriviledgedUser ? true : false,
      refetchOnMountOrArgChange: true,
    }
  );

  const userRegions = getRegions(account.users_sites);
  const userSites = useMemo(() => {
    return getSites(regionId, account.users_sites);
  }, [account, regionId]);

  function selectRegion(id) {
    setRegionId(id);
    setValue("region_id", id, {
      shouldValidate: true,
    });
    if (id === "all") selectSite("all");
  }

  function selectSite(id) {
    setValue("site_id", id, {
      shouldValidate: true,
    });
  }

  function hasExportTypes() {
    const { permitted_export_types } = account;
    return permitted_export_types.length >= 1 ? true : false;
  }

  function checkRegions() {
    if (isPriviledgedUser) {
      return [
        {
          id: "all",
          name: "all",
        },
        ...regions,
      ];
    }
    return userRegions;
  }

  function checkSites() {
    if (isPriviledgedUser) {
      return sites;
    }
    return userSites;
  }

  function getMaxDate() {
    return endOfMonth(new Date());
  }

  function getMinDate() {
    const { permitted_export_range: range } = account;
    if (range === 1) {
      return startOfMonth(new Date());
    }
    return startOfMonth(subMonths(new Date(), range));
  }

  async function handleDataExport(data) {
    const API_URL = process.env.REACT_APP_API_URL;
    const request = {
      ...data,
      start_date: format(new Date(data.start_date), "yyyy-MM-dd"),
      end_date: format(new Date(data.end_date), "yyyy-MM-dd"),
    };
    try {
      const response = await dataExport(request).unwrap();
      downloadRef.current.href = API_URL + response;
      downloadRef.current.click();
      toast.success("Data export ready");
      downloadRef.current.href = "empty";
    } catch (error) {
      // we handle errors with middleware
    }
  }

  if (fetchingProfile) return <Loading />;
  return (
    <FlexGrid fullWidth className="page">
      <Column sm={4} lg={{ span: 8, offset: 4 }}>
        {isMobile && <TabBar />}
        <PageHeader
          title="Data export"
          description="Export records for a select timeframe"
          renderIcon={<WatsonHealthDownloadStudy size={42} />}
        />
        <Spacer h={7} />

        {!hasExportTypes() ? (
          <InlineNotification
            kind="error"
            hideCloseButton
            lowContrast
            title="Invalid permission"
            subtitle="Sorry, you do not have the right permission to export data, contact administrator"
          />
        ) : (
          <Form onSubmit={handleSubmit(handleDataExport)}>
            <Spacer h={5} />
            <Stack gap={7}>
              <FormGroup legendText="Region">
                {!loadingRegions ? (
                  <Dropdown
                    id="region"
                    titleText=""
                    label="Select region"
                    items={checkRegions()}
                    itemToString={(item) => item.name}
                    invalid={errors.region_id ? true : false}
                    invalidText={errors.region_id?.message}
                    onChange={(evt) => selectRegion(evt.selectedItem.id)}
                  />
                ) : (
                  <DropdownSkeleton />
                )}
              </FormGroup>

              <FormGroup legendText="Site">
                {!loadingSites ? (
                  <Dropdown
                    id="site"
                    titleText=""
                    label={
                      sites.length && regionId !== "all"
                        ? "Select site"
                        : regionId === "all"
                        ? "Exporting for all sites"
                        : "No available sites"
                    }
                    items={checkSites()}
                    itemToString={(item) => item.name}
                    invalid={errors.site_id ? true : false}
                    invalidText={errors.site_id?.message}
                    disabled={regionId === "all" ? true : false}
                    onChange={(evt) => selectSite(evt.selectedItem.id)}
                  />
                ) : (
                  <DropdownSkeleton />
                )}
              </FormGroup>

              <Row>
                <Column>
                  <DatePicker
                    datePickerType="single"
                    maxDate={getMaxDate()}
                    minDate={getMinDate()}
                    onChange={(evt) => {
                      handleSetValue("start_date", evt[0], setValue);
                    }}
                  >
                    <DatePickerInput
                      id="start_date"
                      placeholder="mm/dd/yyyy"
                      labelText="Start date"
                      invalid={errors.start_date ? true : false}
                      invalidText={errors.start_date?.message}
                    />
                  </DatePicker>
                  <Spacer h={7} />
                </Column>
                <Column>
                  <DatePicker
                    datePickerType="single"
                    maxDate={getMaxDate()}
                    minDate={getMinDate()}
                    onChange={(evt) => {
                      handleSetValue("end_date", evt[0], setValue);
                    }}
                  >
                    <DatePickerInput
                      id="end_date"
                      placeholder="mm/dd/yyyy"
                      labelText="End date"
                      invalid={errors.end_date ? true : false}
                      invalidText={errors.end_date?.message}
                    />
                  </DatePicker>
                  <Spacer h={7} />
                </Column>
              </Row>

              <Dropdown
                id="format"
                titleText="Export format"
                label="Select format"
                items={account.permitted_export_types}
                itemToString={(item) => item}
                invalid={errors.format ? true : false}
                invalidText={errors.format?.message}
                onChange={(evt) => {
                  handleSetValue("format", evt.selectedItem, setValue);
                }}
              />

              {isExporting ? (
                <InlineLoading
                  status="active"
                  iconDescription="Active loading indicator"
                  description="processing ..."
                />
              ) : (
                <Fragment>
                  <Button type="submit">Query and download</Button>
                  <a
                    ref={downloadRef}
                    href="empty"
                    aria-label="download link"
                    download
                    hidden
                  >
                    download
                  </a>
                </Fragment>
              )}
            </Stack>
          </Form>
        )}
      </Column>
    </FlexGrid>
  );
};

export default DataExport;
