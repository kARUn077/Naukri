import React, { useEffect, useMemo, useState } from 'react';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Edit2, Eye, MoreHorizontal } from 'lucide-react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const AdminJobsTable = () => {
  const { allAdminJobs, searchJobByText } = useSelector(store => store.job); // Fetching jobs and search text from Redux state
  const navigate = useNavigate(); // Hook to navigate between pages
  const [filterJobs, setFilterJobs] = useState(allAdminJobs); // Local state for filtered jobs

  useEffect(() => {
    console.log("🔍 Filter Triggered");
    console.log("Search Text:", searchJobByText);
    console.log("All Jobs:", allAdminJobs);

    const filteredJobs = allAdminJobs.filter((job) => {
      const text = searchJobByText.toLowerCase().trim();

      const jobTitle = job?.title?.toLowerCase() || "";
      const companyName = job?.company?.name?.toLowerCase() || "";
      const industry = job?.company?.industry?.toLowerCase() || "";

      const matches =
        jobTitle.includes(text) ||
        companyName.includes(text) ||
        industry.includes(text);

      // Log match information
      console.log(`✅ Job: ${jobTitle} | Company: ${companyName} | Industry: ${industry} | Match: ${matches}`);

      return matches;
    });

    console.log("🧠 Filtered Jobs:", filteredJobs);
    setFilterJobs(filteredJobs); // Update filtered jobs state
  }, [allAdminJobs, searchJobByText]); // Trigger when jobs or search text changes

  return (
    <div>
      <Table>
        <TableCaption>A list of your recently posted jobs</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Company Name</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filterJobs.map((job) => (
            <TableRow key={job._id}>
              <TableCell>{job?.company?.name}</TableCell>
              <TableCell>{job?.title}</TableCell>
              <TableCell>{job?.createdAt?.split("T")[0]}</TableCell>
              <TableCell className="text-right cursor-pointer">
                <Popover>
                  <PopoverTrigger>
                    <MoreHorizontal />
                  </PopoverTrigger>
                  <PopoverContent className="w-32">
                    <div
                      onClick={() => navigate(`/admin/companies/${job._id}`)}
                      className="flex items-center gap-2 w-fit cursor-pointer"
                    >
                      <Edit2 className="w-4" />
                      <span>Edit</span>
                    </div>
                    <div
                      onClick={() => navigate(`/admin/jobs/${job._id}/applicants`)}
                      className="flex items-center w-fit gap-2 cursor-pointer mt-2"
                    >
                      <Eye className="w-4" />
                      <span>Applicants</span>
                    </div>
                  </PopoverContent>
                </Popover>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default AdminJobsTable;
