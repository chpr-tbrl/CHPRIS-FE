import React, { Fragment } from "react";
import { PageHeader, Spacer, TabBar } from "components";
import {
  Button,
  FlexGrid,
  Column,
  Loading,
  ActionableNotification,
} from "@carbon/react";
import { useSelector } from "react-redux";
import { recordSelector } from "features";
import { Person } from "@carbon/icons-react";
import { useNavigate } from "react-router-dom";
import { useGetRecordQuery } from "services";

const RecordDetails = () => {
  const record = useSelector(recordSelector);
  const navigate = useNavigate();
  const {
    data = [],
    isFetching,
    isError,
    refetch,
  } = useGetRecordQuery(record.record_id, {
    refetchOnMountOrArgChange: true,
  });

  if (isFetching) return <Loading />;
  return (
    <FlexGrid fullWidth className="page">
      <Column sm={4} lg={{ span: 8, offset: 4 }}>
        <TabBar />
        <PageHeader
          title="Information"
          description="Manage and update record information"
          renderIcon={<Person size={42} />}
        />

        {isError && (
          <ActionableNotification
            inline
            kind="error"
            title="An error occured"
            subtitle="while fetching record details"
            lowContrast
            hideCloseButton
            actionButtonLabel="try again"
            onActionButtonClick={refetch}
          />
        )}

        {data.length > 0 && (
          <Fragment>
            {Object.keys(data[0]).map((key) => (
              <Fragment key={key}>
                <h5>
                  {key.charAt(0).toUpperCase() +
                    key.slice(1).split("_").join(" ")}
                </h5>
                <br />
                <p>{data[0][key] + "" || "N/A"}</p>
                <Spacer h={5} />
              </Fragment>
            ))}
            <Button onClick={() => navigate(`../${record.record_id}`)}>
              Update record
            </Button>
          </Fragment>
        )}
      </Column>
    </FlexGrid>
  );
};

export default RecordDetails;
