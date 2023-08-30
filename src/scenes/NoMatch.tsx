import Section from "layout/nsw-design-system/Section";
import { Link } from "react-router-dom";

function NoMatch() {
  return (
    <Section>
      <h2>Nothing to see here!</h2>
      <p>
        <Link to="/">Go to the home page of the app</Link>
      </p>
    </Section>
  );
}

export { NoMatch };
