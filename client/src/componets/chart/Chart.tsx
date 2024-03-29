import { BarChart } from "@mui/x-charts/BarChart";
import { useEffect, useRef, useState } from "react";
import useAxiosPrivate from "../../app/useAxiosPrivate";
import "../../app/GlobalStyles.css";

const Chart = () => {
  const axiosPrivate = useAxiosPrivate();
  const [yearRange, setYearRange] = useState<number[]>([]);
  const [userReport, setUserReport] = useState({
    January: 0,
    February: 0,
    March: 0,
    April: 0,
    May: 0,
    June: 0,
    July: 0,
    August: 0,
    September: 0,
    October: 0,
    November: 0,
    December: 0,
  });
  const containerRef = useRef<HTMLOptionElement | null>(null);
  const [year, setYear] = useState<number>(1111);

  useEffect(() => {
    const date = new Date();
    setYear(date.getFullYear());
    const arr = [];
    for (let yearCount = date.getFullYear(); yearCount >= 2020; yearCount--) {
      arr.push(yearCount);
    }
    setYearRange(arr);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const response = await axiosPrivate.get("admin/yearSort", {
          params: { year: year },
          withCredentials: true,
        });
        setUserReport(response.data?.monthlyData);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [year, axiosPrivate]);

  // useEffect(() => {
  //   (async () => {
  //     if (year > 1111) {
  //       const response = await axiosPrivate.get(
  //         `admin/monthly-users/${year ? year : ""}`,
  //         {
  //           withCredentials: true,
  //         }
  //       );
  //       if (response.data) {
  //         console.log(response.data);
  //         setUserReport(response.data.monthlyData);
  //       }
  //     }
  //   })();
  // }, [year, axiosPrivate]);

  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        const width = containerRef.current?.clientWidth - 20;
        const height = width * 0.5;
        setDimensions({ width, height });
      }
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const [dimensions, setDimensions] = useState({
    width: 300,
    height: 800,
  });
  return (
    <>
      <div className="bg-background-two w-full">
        <section className="chart-header flex justify-between">
          <h1 className="text-xl text-white">New Users</h1>
          <select
            className="border h-min w-36 rounded-md bg-gray-200"
            value={year}
            onChange={(e) => setYear(Number(e.target.value))}
          >
            {yearRange &&
              yearRange.map((currentYear, index) => {
                return (
                  <option value={currentYear} key={index}>
                    {currentYear}
                  </option>
                );
              })}
          </select>
        </section>
        <section
          className="main-diagram"
          ref={containerRef}
          style={{ width: "100%", height: "100%" }}
        >
          <BarChart
            xAxis={[
              {
                id: "barCategories",
                data: [
                  "January",
                  "February",
                  "March",
                  "April",
                  "May",
                  "June",
                  "July",
                  "Auguest",
                  "September",
                  "October",
                  "November",
                  "December",
                ],
                scaleType: "band",
              },
            ]}
            series={[
              {
                data: [
                  userReport.January,
                  userReport.February,
                  userReport.March,
                  userReport.April,
                  userReport.May,
                  userReport.June,
                  userReport.July,
                  userReport.August,
                  userReport.September,
                  userReport.October,
                  userReport.November,
                  userReport.December,
                ],
              },
            ]}
            width={dimensions.width}
            height={dimensions.height}
          />
        </section>
      </div>
    </>
  );
};

export default Chart;
