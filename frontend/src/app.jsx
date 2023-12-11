/* eslint-disable*/
import React, { useState } from "react";
import axios from "axios";
import { RESUME } from "../Abhishek Resume";
function App() {
  //   const [resumePdf,setResumePdf]=useState(null)
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [uploadPercentage, setUploadPercentage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [parsedResume, setParsedResume] = useState(null);

  const handleFileUpload = async (e) => {
    setParsedResume(null);
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("file", file);
    console.log(file);
    // setResumePdf(file)

    try {
      setError("");
      setIsLoading(true);
      setSuccess("");
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/uploadfile`,
        formData,
        {
          onUploadProgress: (progressEvent) => {
            const progress = Math.round(
              (progressEvent.loaded / progressEvent.total) * 100
            );
            setUploadPercentage(progress);
          },
        }
      );
      console.log(response.data.information);
      setParsedResume(response.data.information);
      setSuccess("Successfully Parsed");
    } catch (error) {
      const err = error.response.data.message;
      console.error("Error uploading file:", error);
      setError(err || "Something went wrong");
    } finally {
      setIsLoading(false);
      setUploadPercentage(0);
    }
  };

  return (
    <div className="min-h-screen bg-slate-800 text-white ">
      <div className="w-full flex flex-col gap-16 items-center p-10">
        <h1 className="text-5xl font-bold border-b-2 p-2">
          LLM BASED RESUME PARSER
        </h1>
        <div>
          <label
            htmlFor="upload_resume"
            className={`
            ${isLoading ? "bg-slate-400 cursor-none" : ""}  
            border-2 p-4 rounded-lg text-3xl cursor-pointer`}
          >
            {uploadPercentage == 0 || error == ""
              ? "Upload Resume (pdf)"
              : uploadPercentage}
          </label>
          <input
            type="file"
            accept="application/pdf"
            name="upload_resume"
            id="upload_resume"
            className="hidden"
            onChange={handleFileUpload}
            disabled={isLoading}
          />
        </div>
      </div>

      {error ? (
        <>
          <h1 className="m-9 text-4xl text-red-600 text-center">{error}</h1>
        </>
      ) : !isLoading ? (
        <div className="lg:w-3/5 py-8 mx-auto">
          {success && (
            <h1 className="m-9 text-3xl text-green-600 text-center">
              {success}
            </h1>
          )}
          <RenderResume resume={parsedResume} />
        </div>
      ) : (
        <h1 className="m-9 text-4xl text-red-600 text-center">Loading...</h1>
      )}
    </div>
  );
}

export default App;

const RenderResume = ({ resume }) => {
  if (!resume) return null;
  return (
    <>
      <div className="text-xl">
        {/* <ContactInfo Contact_Information={resume.Contact_Information} />
        <WorkExpInfo Work_Experience={resume.Work_Experience} />
        <EducationInfo Education={resume.Education} />
        <SkillsInfo Skills={resume.Skills} />
        <ProjectsInfo Projects={resume.Projects} />
        <CertificateInfo Certificates={resume.Certificates} />
        <AchievementsInfo Achievements={resume.Achievements} />
        <VoulunteeringInfo Volunteer={resume.Volunteer} /> */}
        <GenerateJSXFromJSON data={resume} />
        {/* <GenerateJSXFromJSON data={resume.Work_Experience} /> */}
      </div>
    </>
  );
};

const ContactInfo = ({ Contact_Information }) => {
  if (!Contact_Information) return null;
  return (
    <section className="my-8">
      <h1 className="text-2xl font-bold mb-4">Contact Information</h1>
      <table className="border-separate border-spacing-4 border border-slate-500 rounded-lg">
        <tbody className="">
          <tr>
            <td className="font-bold">Name</td>
            <td>{Contact_Information.Name}</td>
          </tr>
          <tr>
            <td className="font-bold">Email</td>
            <td>{Contact_Information.Email}</td>
          </tr>
          <tr>
            <td className="font-bold">Contact</td>
            <td>{Contact_Information.Contact}</td>
          </tr>
          <tr>
            <td className="font-bold">Socials</td>
            <td>
              <ul className="">
                {Contact_Information.Links?.map((link, index) => (
                  <li key={index} className="hover:text-green-700">
                    <a href={link}>{link}</a>
                  </li>
                ))}
              </ul>
            </td>
          </tr>
        </tbody>
      </table>
    </section>
  );
};

const WorkExpInfo = ({ Work_Experience }) => {
  if (!Work_Experience) return null;
  return (
    <section className="my-8">
      <h2 className="text-2xl font-bold mb-4">Work Experience</h2>
      <div className="flex flex-wrap gap-7">
        {Work_Experience.map((experience, index) => (
          <React.Fragment key={index}>
            <table className="lg:w-max w-full border-separate border-spacing-4 border border-slate-500 rounded-lg">
              <tbody>
                <tr>
                  <td className="font-bold">Title</td>
                  <td>{experience.title}</td>
                </tr>
                <tr key={`${index}-company`}>
                  <td className="font-bold">Company</td>
                  <td>{experience.company}</td>
                </tr>
                <tr key={`${index}-duration`}>
                  <td className="font-bold">Duration</td>
                  <td>{experience.duration}</td>
                </tr>
              </tbody>
            </table>
          </React.Fragment>
        ))}
      </div>
    </section>
  );
};

const EducationInfo = ({ Education }) => {
  if (!Education) return null;

  return (
    <section className="my-8">
      <h2 className="text-2xl font-bold mb-4">Education</h2>
      <div className="flex flex-wrap gap-7">
        {Education.map((item, index) => (
          <React.Fragment key={index}>
            <table className="lg:w-max w-full border-separate border-spacing-4 border border-slate-500 rounded-lg">
              <tbody>
                {Object.keys(item).map((key) => (
                  <React.Fragment key={key}>
                    <tr>
                      <td className="flex flex-col">
                        <div>{key}</div>
                        <div>{item[key]}</div>
                      </td>
                    </tr>
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </React.Fragment>
        ))}
      </div>
    </section>
  );
};

const CertificateInfo = ({ Certificates }) => {
  if (!Certificates || Certificates.length == 0) return null;

  return (
    <section className="my-8">
      <h2 className="text-2xl font-bold mb-4">Certificates</h2>
      <div className="flex flex-wrap gap-7">
        {Certificates.map((item, index) => (
          <React.Fragment key={index}>
            <table className="lg:w-max w-full border-separate border-spacing-4 border border-slate-500 rounded-lg">
              <tbody>
                <tr>
                  <td>{item}</td>
                </tr>
              </tbody>
            </table>
          </React.Fragment>
        ))}
      </div>
    </section>
  );
};
const SkillsInfo = ({ Skills }) => {
  if (!Skills || Skills.length == 0) return null;

  return (
    <section className="my-8">
      <h2 className="text-2xl font-bold mb-4">Skills</h2>
      <div className="flex flex-wrap gap-7">
        {Skills.map((item, index) => (
          <React.Fragment key={index}>
            <table className="lg:w-max w-full border-separate border-spacing-4 border border-slate-500 rounded-lg">
              <tbody>
                <tr>
                  <td>{item}</td>
                </tr>
              </tbody>
            </table>
          </React.Fragment>
        ))}
      </div>
    </section>
  );
};

const ProjectsInfo = ({ Projects }) => {
  if (!Projects) return null;

  return (
    <section className="my-8">
      <h2 className="text-2xl font-bold mb-4">Projects</h2>
      <div className="flex flex-wrap gap-7">
        {Projects.map((item, index) => (
          <React.Fragment key={index}>
            <table className="lg:w-max w-full border-separate border-spacing-4 border border-slate-500 rounded-lg">
              <tbody>
                <tr>
                  <td className="font-bold">Name</td>
                  <td>{item.name}</td>
                </tr>
                <tr>
                  <td className="font-bold">Description</td>
                  <td>{item.description}</td>
                </tr>
                <tr>
                  <td className="font-bold">Link</td>
                  <td>
                    <a href={item.link}>{item.link}</a>
                  </td>
                </tr>
              </tbody>
            </table>
          </React.Fragment>
        ))}
      </div>
    </section>
  );
};
const AchievementsInfo = ({ Achievements }) => {
  if (!Achievements || Achievements.length == 0) return null;

  return (
    <section className="my-8">
      <h2 className="text-2xl font-bold mb-4">Achievements</h2>
      <div className="flex flex-wrap gap-7">
        {Achievements.map((item, index) => (
          <React.Fragment key={index}>
            <table className="lg:w-max w-full border-separate border-spacing-4 border border-slate-500 rounded-lg">
              <tbody>
                <tr>
                  <td>{item}</td>
                </tr>
              </tbody>
            </table>
          </React.Fragment>
        ))}
      </div>
    </section>
  );
};

const VoulunteeringInfo = ({ Volunteer }) => {
  if (!Volunteer || Volunteer.length == 0) return null;

  return (
    <section className="my-8">
      <h2 className="text-2xl font-bold mb-4">Volunteer</h2>
      <div className="flex flex-wrap gap-7">
        {Volunteer.map((item, index) => (
          <React.Fragment key={index}>
            <table className="lg:w-max w-full border-separate border-spacing-4 border border-slate-500 rounded-lg">
              <tbody>
                <tr>
                  <td>{item}</td>
                </tr>
              </tbody>
            </table>
          </React.Fragment>
        ))}
      </div>
    </section>
  );
};

const GenerateJSXFromJSON = ({ data, depth = 0 }) => {
  if (Array.isArray(data)) {
    // If it's an array, check if it contains objects with key-value pairs
    if (
      data.every((item) => typeof item === "object" && !Array.isArray(item))
    ) {
      return (
        <ul className=" flex flex-col gap-4 ">
          {data.map((item, index) => (
            <li key={index} className="flex  border-b-2 p-4 ">
              <GenerateJSXFromJSON data={item} depth={depth + 1} />
            </li>
          ))}
        </ul>
      );
    } else {
      // If it's a regular array, just display the elements
      return (
        <ul className="flex gap-2 flex-wrap p-4 ">
          {data.map((item, index) => (
            <li key={index} className="border p-4">
              <GenerateJSXFromJSON data={item} depth={depth + 1} />
            </li>
          ))}
        </ul>
      );
    }
  } else if (typeof data === "object" && data !== null) {
    // If it's an object, loop over the keys and values
    return (
      <ul>
        {Object.entries(data).map(([key, value], index) => {
          if (!value) return null;
          else
            return (
              <li
                key={index}
                className={`flex 
                ${depth == 0 ? "border-2 m-8 p-3 rounded-lg" : ""}
                ${depth == 1 ? "border-2 m-8 p-1 rounded-lg" : ""}
                ${
                depth > 1
                    ? "flex-row items-center gap-8 "
                    : typeof value === "string" || typeof value === "number"
                    ? "flex-row items-center gap-8 truncate "
                    : "flex-col justify-center  "
                }  `}
              >
                <div className={`text-${3 - depth}xl font-semibold`}>
                  {key}:
                </div>
                <GenerateJSXFromJSON data={value} depth={depth + 1} />
              </li>
            );
        })}
      </ul>
    );
  } else {
    // If it's a string or a primitive value, just display it
    if (!data) return <div className="">NONE</div>;
    else if (!isLinkValid(data)) return <div className="">{data}</div>;
    else
      return (
        <div className="hover:text-green-500 w-max">
          <a href={data}>{data}</a>
        </div>
      );
  }
};

function isLinkValid(url) {
  // Regular expression for a simple URL pattern
  const urlPattern = /^(ftp|http|https):\/\/[^ "]+$/;

  // Test if the provided URL matches the pattern
  return urlPattern.test(url);
}
