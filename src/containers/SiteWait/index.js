/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import React from "react";

import LineChart from "../../components/LineChart";
import { CommonFilters } from "../../components/Chart";
import MetricsTemplate from "../MetricsTemplate";
import { ObjectNested } from "../../libraries";
import {
  mostAndLeast,
  normalize,
  getTemporaryDefaultFilters,
} from "../../modules/Chart";
import { TEMP_MIN_DATE } from "../../constants/Charts";
import Router from "../../routes";

const handleData = (data) => {
  const localData = ObjectNested.get(data, "timeline", {});
  return {
    globalStats: mostAndLeast(localData),
    chart: normalize(localData, "openIssues"),
  };
};

const SiteWait = () => {
  return (
    <MetricsTemplate
      endpoint={Router.getRoute("sitewait-timeline")}
      title={"Site Wait Dashboard"}
      subtitle={"Tracking issue sitewait burndown rate"}
      normalizeData={handleData}
      shouldRenderCommonFilters={false}
      injectedFilters={getTemporaryDefaultFilters(TEMP_MIN_DATE)}
      renderFilters={(handleChange, filters) => (
        <CommonFilters
          onChange={handleChange}
          filters={filters}
          minFrom={TEMP_MIN_DATE}
          minTo={TEMP_MIN_DATE}
        />
      )}
      renderChart={(data) => (
        <LineChart
          title={"Open issues in sitewait milestone"}
          label={""}
          labels={ObjectNested.get(data, "chart.dates", [])}
          legend={{ display: false }}
          data={ObjectNested.get(data, "chart.openIssues", [])}
          options={{
            scales: {
              xAxes: [
                {
                  type: "time",
                  distribution: "linear",
                  time: {
                    unit: "day",
                  },
                },
              ],
            },
          }}
        />
      )}
    />
  );
};

export default SiteWait;
