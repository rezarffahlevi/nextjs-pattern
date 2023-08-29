"use client";
import Image from "@/components/molecules/Loader";

const AboutPage = () => {
  return (
    <div className="px-2 md:px-16 py-8">
      <h4 style={{ marginBottom: 5 }}>
        {" "}
        <span className="font-bold">About Us</span>{" "}
      </h4>
      <div
        className="divider"
        style={{
          marginBlock: 5,
        }}
      >
        <i className="icon-circle"></i>
      </div>
      <div id="ContentPlaceHolder1_divcontents">
        <p>&nbsp;</p>

        <p>&nbsp;</p>

        <p>
          <Image
            alt=""
            src="https://flixcinema.com/assets/images/main.png"
            height={405}
            width={720}
          />
        </p>

        <p>&nbsp;</p>

        <p>
          <strong>
            <span style={{ fontSize: 16 }}>FLIX Cinema</span>
          </strong>
        </p>

        <p>Fantasy, Live, Innovation, and ultimate eXperiences.</p>

        <p>
          The most current cinema chain that offers ultimate film experience. We
          have laser projector to provide a better quality of light, brightness
          uniformity, and colors for your favorite movie, best high-performance
          speakers and audio system, comfy seats, wide seating distance, very
          stylish and exclusive mood&nbsp;in every lounge, and amazing foods and
          beverages that can complete your film experience!&nbsp;
        </p>

        <p>
          Founded by Agung Sedayu Group. We are at PIK Avenue, Grand Galaxy
          Park, Mall of Indonesia and Ashta District 8.
        </p>

        <p>&nbsp;</p>

        <p>
          <span style={{ fontSize: 6 }}>
            <strong>FLIX Halls</strong>
          </span>
        </p>

        <p>
          <Image
            alt=""
            src="https://flixcinema.com/assets/images/cozy.png"
            height={405}
            width={720}
          />
        </p>

        <p>
          <Image
            alt=""
            src="https://flixcinema.com/assets/images/silver.png"
            height={405}
            width={720}
          />
        </p>

        <p>
          <Image
            alt=""
            src="https://flixcinema.com/assets/images/luxe.png"
            height={405}
            width={720}
          />
        </p>

        <p>
          <Image
            alt=""
            src="https://flixcinema.com/assets/images/gold.png"
            height={405}
            width={720}
          />
        </p>

        <p>
          <Image
            alt=""
            src="https://flixcinema.com/assets/images/platinum.png"
            height={405}
            width={720}
          />
        </p>

        <p>
          <Image
            alt=""
            src="https://flixcinema.com/assets/images/stellar.png"
            height={405}
            width={720}
          />
        </p>
      </div>
    </div>
  );
};

export default AboutPage;
