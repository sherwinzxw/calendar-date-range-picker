const Section = (props: any) => {
  const { children } = props;

  return (
    // <!-- START: Section content -->
    <section className="nsw-section">
      <div className="nsw-container">
        <div className="nsw-layout">
          <div className="nsw-layout__main">{children}</div>
        </div>
      </div>
    </section>
    // <!-- END: Section content -->
  );
};

export default Section;
