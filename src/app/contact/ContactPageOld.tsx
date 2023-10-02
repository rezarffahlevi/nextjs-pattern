"use client";
import Image from "@/components/Loader";
import { useAppContext } from "../provider";

const ContactPage = () => {
  const { state, dispatch } = useAppContext();

  return (<main className="main">
    <div className="page-header" style={{ backgroundColor: '#f9f8f4' }}>
      <h1 className="page-title text-8xl">Contact Us</h1>
    </div>
    <div className="page-content about-page">
      <div className="container py-10">
        {
          state.listCinema?.map((dt: any, i: any) => {
            return (
              <div className="py-8" key={'cu-' + dt?._id}>
                <h3 className="font-bold">{dt?.name}</h3>

                <p>{dt?.admin?.suburb_name}</p>

                <p>
                  {dt?.admin?.address}
                </p>
              </div>
            )
          })
        }
      </div>
    </div>
  </main>);
};

export default ContactPage;
