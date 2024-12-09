type SectionHeadingProps = {
  children: React.ReactNode;
};

export default function SectionHeading({ children }: SectionHeadingProps) {
  return (
    <h2 className="text-3xl font-semibold text-green-500 drop-shadow-xl capitalize mb-8 text-center">
      {children}
    </h2>
  );
}
