import Datepicker from "components/datepicker/Datepicker";
import Card from "components/nsw-design-system/Card";
import Section from "layout/nsw-design-system/Section";

const Home = () => {
  return (
    <Section>
      <h1>Calendar Date Range Picker</h1>
      <br />
      <div className="nsw-grid">
        <div className="nsw-col nsw-col-md-6 nsw-col-lg-4">
          <Datepicker></Datepicker>
        </div>
      </div>
    </Section>
  );
};
export default Home;
