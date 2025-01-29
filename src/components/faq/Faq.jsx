import "./faq.css";
import { Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { faqData } from "./faqData";

const Faq = () => {
  return (
    <section className="pt-20 pb-24 laptop-l:pt-16 laptop-l:pb-20 laptop-md:pt-12 laptop-md:pb-16 laptop:pt-10 laptop:pb-14 laptop-s:py-10 tab-m:py-8 tab:py-6">
      <div className="faq-main-container">
        <div className="flex justify-center items-center mb-24 laptop-l:mb-16 laptop-md:mb-12 laptop:mb-10 laptop-s:mb-8 tab-m:mb-6 tab:mb-4">
          <h1 className="faq-heading">FREQUENTLY ASKED QUESTIONS</h1>
        </div>
        <div className="text-[1.8rem] leading-[1.9] text-[#3c4b5d] font-semibold laptop-l:text-[1.6rem] laptop-md:text-[1.5rem] laptop-md:font-medium laptop:text-[1.4rem] laptop-s:text-[1.3rem] tab-m:text-[1.2rem]">
          <p className="mb-10 laptop-l:mb-8 laptop-md:mb-6 laptop:mb-4 tab-m:mb-3">
            First and foremost, provide a convenient and easy to use laundry
            service for individuals to have their cleaning items picked up,
            professionally cleaned and delivered to and from their place of
            business/home.
          </p>
          <p>
            When you&apos;re searching for a better laundry service provider,
            turn to Sikka Cleaners. We are a superior resource for all of your
            laundry servicing needs, whether you operate an apartment community,
            condominium, or multi-family housing property. Discover our
            unparalleled customer service, experienced and friendly staff, and
            flexible approach.
          </p>
        </div>
        <div className="pt-14 pb-24 space-y-16 laptop-l:pt-10 laptop-l:pb-20 laptop-l:space-y-12 laptop-md:pb-16 laptop:pb-12 laptop-s:py-10 tab-m:py-8 tab:py-6">
          {faqData.map((section, sectionIndex) => (
            <div key={sectionIndex}>
              <div className="flex justify-center items-center mb-16 laptop-l:mb-12 laptop-md:mb-10 tab-m:mb-8 tab:mb-6">
                <h3 className="faq-sub-heading">{section.sectionTitle}</h3>
              </div>

              <div className="flex flex-col justify-center gap-12 laptop-l:gap-10 laptop:gap-8">
                {section.faqs.map((faq, faqIndex) => {
                  const { question, answer } = faq;
                  return (
                    <div
                      key={faqIndex}
                      className="shadow-xl border border-black/50 rounded-lg laptop:shadow-lg laptop-s:border-[0.75px]"
                    >
                      <Accordion>
                        <AccordionSummary
                          expandIcon={
                            <ExpandMoreIcon
                              sx={{
                                fontSize: {
                                  md: 30,
                                  lg: 20,
                                },
                                color: "#161F5F",
                              }}
                            />
                          }
                        >
                          <div className="faq-question">{question}</div>
                        </AccordionSummary>
                        <AccordionDetails
                          sx={{
                            padding: {
                              xl: "10px",
                              md: "12.5px",
                              sm: "10px",
                            },
                          }}
                        >
                          <div className="faq-ans">{answer}</div>
                        </AccordionDetails>
                      </Accordion>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Faq;
