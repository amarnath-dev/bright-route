import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { storage } from "../../config/firebase";
import { getDownloadURL, ref } from "firebase/storage";
import { MentorListCard } from "../../componets/ListMentorCard";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useEffect, useState } from "react";
import { MentorProfileObj } from "../../interfaces/mentor.interface";
import "../../styles/global-style.css";

const SearchMentors = () => {
  const [filtered, setFiltered] = useState<MentorProfileObj[]>([]);

  const [jobTitle, setJobTitle] = useState("");
  const [skill, setSkill] = useState("");
  const [company, setCompany] = useState("");

  const axiosPrivate = useAxiosPrivate();
  useEffect(() => {
    const mentorProfile = async () => {
      try {
        const response = await axiosPrivate.get("/browse-mentors", {
          withCredentials: true,
        });
        if (response.data) {
          const mentorProfile = response.data;
          console.log("Mentor Details", mentorProfile.allMentors);
          setFiltered(mentorProfile.allMentors);
        }
      } catch (error) {
        console.error(error);
      }
    };
    mentorProfile();
  }, [axiosPrivate]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        await Promise.all(
          filtered.map(async (mentor) => {
            const imageId = mentor.profile_img;
            if (imageId) {
              const imageRef = ref(storage, imageId);
              const url = await getDownloadURL(imageRef);
              setFiltered((prevMentors) =>
                prevMentors.map((prevMentor) =>
                  prevMentor.profile_img === imageId
                    ? { ...prevMentor, imageUrl: url }
                    : prevMentor
                )
              );
            }
          })
        );
      } catch (error) {
        console.error(error);
      }
    };
    fetchImages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filtered?.length]);

  //Sorting Request
  useEffect(() => {
    const filterAndSortMentors = async () => {
      try {
        const response = await axiosPrivate.post(
          "/sort",
          {
            jobTitle,
            skill,
            company,
          },
          { withCredentials: true }
        );
        if (response.data.status === "success") {
          setFiltered(response.data?.allMentors);
        } else {
          setFiltered([]);
        }
      } catch (error) {
        console.error("Error filtering and sorting mentors:", error);
      }
    };
    filterAndSortMentors();
  }, [jobTitle, skill, company, axiosPrivate]);

  return (
    <>
      <div className="w-full h-full bg-background-two">
        <div className="w-full h-72 flex justify-center items-center px-3 py-3">
          <div className="w-full h-full md:w-1/2 md:flex md:justify-center md:items-center md:flex-col">
            <label className="relative flex justify-center items-center">
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={topTechnicalJobPositions}
                className="custom-autocomplete"
                renderInput={(params) => (
                  <TextField
                    {...params}
                    // label="Search by Job Title"
                    InputProps={{
                      ...params.InputProps,
                      placeholder: "Select by job title",
                    }}
                  />
                )}
                onChange={(_event, value) => setJobTitle(value?.label || "")}
              />
            </label>

            <div className="flex items-center flex-col md:flex-row">
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={topTechnicalSkills}
                className="custom-autocomplete"
                sx={{ width: 300, marginTop: 3, padding: 1 }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    // label="Search by Skills"
                    InputProps={{
                      ...params.InputProps,
                      placeholder: "Select by Skill",
                    }}
                  />
                )}
                onChange={(_event, value) => setSkill(value?.label || "")}
              />
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={topTechnicalCompanies}
                className="custom-autocomplete"
                sx={{ width: 300, marginTop: 3, padding: 1 }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    // label="Search by Company"
                    InputProps={{
                      ...params.InputProps,
                      placeholder: "Select by Company",
                    }}
                  />
                )}
                onChange={(_event, value) => setCompany(value?.label || "")}
              />
            </div>
          </div>
        </div>
      </div>
      <MentorListCard filtered={filtered} />
    </>
  );
};

export default SearchMentors;

const topTechnicalSkills = [
  { id: 1, label: "Node js" },
  { id: 2, label: "React" },
  { id: 3, label: "JavaScript" },
  { id: 4, label: "TypeScript" },
  { id: 5, label: "HTML" },
  { id: 6, label: "CSS" },
  { id: 7, label: "MongoDB" },
  { id: 8, label: "Express.js" },
  { id: 9, label: "Angular" },
  { id: 10, label: "Vue js" },
  { id: 11, label: "Python" },
  { id: 12, label: "Django" },
  { id: 13, label: "Flask" },
  { id: 14, label: "Java" },
  { id: 15, label: "Spring Framework" },
  { id: 16, label: "C#" },
  { id: 17, label: ".NET" },
  { id: 18, label: "PHP" },
  { id: 19, label: "Laravel" },
  { id: 20, label: "MySQL" },
  { id: 21, label: "PostgreSQL" },
  { id: 22, label: "Git" },
  { id: 23, label: "RESTful API Design" },
  { id: 24, label: "GraphQL" },
  { id: 25, label: "Docker" },
  { id: 26, label: "Kubernetes" },
  { id: 27, label: "AWS" },
  { id: 28, label: "Azure" },
  { id: 29, label: "Jenkins" },
  { id: 30, label: "Ruby" },
  { id: 31, label: "Agile Development" },
  { id: 32, label: "Scrum" },
  { id: 33, label: "Kanban" },
  { id: 34, label: "Jira" },
];

const topTechnicalCompanies = [
  { id: 1, label: "Google" },
  { id: 2, label: "Microsoft" },
  { id: 3, label: "Apple" },
  { id: 4, label: "Amazon" },
  { id: 5, label: "Facebook" },
  { id: 6, label: "Twitter" },
  { id: 7, label: "MongoDB, Inc." },
  { id: 8, label: "Adobe" },
  { id: 9, label: "IBM" },
  { id: 10, label: "Vue js Corp" },
  { id: 11, label: "Pallets Projects" },
  { id: 12, label: "Oracle" },
  { id: 13, label: "VMware" },
  { id: 14, label: "Ruby" },
  { id: 15, label: "PHP" },
  { id: 16, label: "Taylor Otwell" },
  { id: 17, label: "GitHub" },
  { id: 18, label: "GraphQL Foundation" },
  { id: 19, label: "Docker Inc" },
  { id: 20, label: "Jenkins" },
  { id: 21, label: "Agile Development" },
  { id: 22, label: "Scrum Alliance" },
  { id: 23, label: "Kanban" },
  { id: 24, label: "Atlassian" },
];

const topTechnicalJobPositions = [
  { id: 1, label: "Software Developer" },
  { id: 2, label: "Software Engineer" },
  { id: 3, label: "ML Engineer" },
  { id: 4, label: "Backend Developer" },
  { id: 5, label: "Data Scientist" },
  { id: 6, label: "DevOps Engineer" },
  { id: 7, label: "UI/UX Designer" },
  { id: 8, label: "Database Administrator" },
  { id: 9, label: "System Architect" },
  { id: 10, label: "Security Engineer" },
  { id: 11, label: "Network Engineer" },
  { id: 12, label: "Full Stack Developer" },
  { id: 13, label: "Mobile App Developer" },
  { id: 14, label: "Cloud Solutions Architect" },
  { id: 15, label: "QA Engineer" },
  { id: 16, label: "Product Manager" },
  { id: 17, label: "Project Manager" },
  { id: 18, label: "Business Analyst" },
  { id: 19, label: "AI Researcher" },
  { id: 20, label: "Data Engineer" },
  { id: 21, label: "IT Support Specialist" },
  { id: 22, label: "Software Development Manager" },
  { id: 23, label: "Technical Writer" },
  { id: 24, label: "Scrum Master" },
  { id: 25, label: "Agile Coach" },
  { id: 26, label: "ML Engineer" },
];
