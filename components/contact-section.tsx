import ContactForm from "./contact-form";

const ContactSection = () => {
  return (
    <div className="mt-8 lg:w-2/5 mx-auto">
      <h3 className="text-center text-green-500 font-semibold text-xl">
        <span className="drop-shadow-lg">Masz Pytanie?</span> Pytaj śmiało!
      </h3>
      <ContactForm />
    </div>
  );
};

export default ContactSection;
