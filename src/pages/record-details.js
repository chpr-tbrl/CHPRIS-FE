import React, { Fragment } from "react";
import { PageHeader, Spacer, TabBar } from "components";
import { Button, FormLabel, FlexGrid, Column, Loading } from "@carbon/react";
import { useSelector } from "react-redux";
import { recordSelector } from "features";
import { Person } from "@carbon/icons-react";
import { useNavigate } from "react-router-dom";
import { useGetRecordQuery } from "services";

const RecordDetails = () => {
  const record = useSelector(recordSelector);
  const navigate = useNavigate();
  const { data = [], isFetching } = useGetRecordQuery(record.record_id, {
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

        {Object.keys(data[0]).map((key) => (
          <Fragment key={key}>
            <FormLabel>{key}</FormLabel>
            <p>{data[0][key] + "" || "N/A"}</p>
            <Spacer h={5} />
          </Fragment>
        ))}

        <Button onClick={() => navigate(`../${record.record_id}`)}>
          Edit record
        </Button>
      </Column>
    </FlexGrid>
  );
};

export default RecordDetails;
