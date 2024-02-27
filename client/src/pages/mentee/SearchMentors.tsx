import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { useEffect, useState } from "react";
import { storage } from "../../app/firebase";
import { getDownloadURL, ref } from "firebase/storage";
import { mentorProfileObj } from "../../datatypes/Datatypes";
import { MentorListCard } from "../../componets/mentorListCard/MentorListCard";
import useAxiosPrivate from "../../app/useAxiosPrivate";

const SearchMentors = () => {
  const [allMentors, setAllMentors] = useState<mentorProfileObj[]>([]);
  const [filtered, setFiltered] = useState<mentorProfileObj[]>([]);

  const [jobTitle, setJobTitle] = useState("");
  const [skill, setSkill] = useState("");
  const [company, setCompany] = useState("");

  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    const mentorProfile = async () => {
      try {
        const response = await axiosPrivate.get("/browse-mentors");
        if (response.data) {
          const mentorProfile = response.data;
          setAllMentors(mentorProfile.allMentors);
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
              setAllMentors((prevMentors) =>
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
        console.log("Image fetch Failed");
        console.error(error);
      }
    };
    fetchImages();
  }, [filtered.length]);

  useEffect(() => {
    const filterMentors = () => {
      let filteredMentors = allMentors;
      if (jobTitle.trim() !== "") {
        filteredMentors = filteredMentors.filter(
          (mentor) => mentor.job_title.toLowerCase() === jobTitle.toLowerCase()
        );
      }
      if (company.trim() !== "") {
        filteredMentors = filteredMentors.filter(
          (mentor) => mentor.company.toLowerCase() === company.toLowerCase()
        );
      }
      if (skill.trim() !== "") {
        filteredMentors = filteredMentors.filter((mentor) =>
          mentor.skills.some((s) => s.includes(skill))
        );
      }
      setFiltered(filteredMentors);
    };
    filterMentors();
  }, [jobTitle, skill, company, allMentors]);

  return (
    <>
      <div className="w-full h-full">
        <div className="w-full h-72 border-2 flex justify-center items-center px-3 py-3">
          <div className="w-full h-full md:w-1/2 md:flex md:justify-center md:items-center md:flex-col">
            <label className="relative flex justify-center items-center">
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={topTechnicalJobPositions}
                sx={{ width: 350, marginTop: 3, padding: 1 }}
                renderInput={(params) => (
                  <TextField {...params} label="Search by Job title" />
                )}
                onChange={(event, value) => setJobTitle(value?.label || "")}
              />
            </label>

            <div className="flex items-center flex-col md:flex-row">
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={topTechnicalSkills}
                sx={{ width: 300, marginTop: 3, padding: 1 }}
                renderInput={(params) => (
                  <TextField {...params} label="Search by Skills" />
                )}
                onChange={(event, value) => setSkill(value?.label || "")}
              />

              <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={topTechnicalCompanies}
                sx={{ width: 300, marginTop: 3, padding: 1 }}
                renderInput={(params) => (
                  <TextField {...params} label="Search by Company" />
                )}
                onChange={(event, value) => setCompany(value?.label || "")}
              />
            </div>
          </div>
        </div>
        <MentorListCard filtered={filtered} />
      </div>
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
  { id: 2, label: "Machine Learning Engineer" },
  { id: 3, label: "Frontend Developer" },
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
