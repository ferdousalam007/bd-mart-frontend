type SectionTitle = {
  title: string;
  description?: string;
  className?: string;
};

const SectionTitle = ({ title, description, className }: SectionTitle) => {
  const defaultClassName = `max-w-[720px] mx-auto text-center md:mb-12 mb-8`;
  const sectionClassName = `${defaultClassName} ${className}`;
  return (
    <div className={`${sectionClassName}`}>
      <h3 className="text-3xl md:text-3xl xl:text-4xl text-primary-text font-medium mb-4 md:mb-6 capitalize ">
        {title}
      </h3>
      {description && <p className="text-secondary-text">{description}</p>}
    </div>
  );
};

export default SectionTitle;
