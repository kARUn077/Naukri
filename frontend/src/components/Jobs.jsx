import React, { useEffect, useState } from 'react';
import Navbar from './shared/Navbar';
import FilterCard from './FilterCard';
import Job from './Job';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';

const Jobs = () => {
    const { allJobs, searchedQuery } = useSelector(store => store.job);
    const [filterJobs, setFilterJobs] = useState(allJobs);

    useEffect(() => {
        if (searchedQuery) {
            const loc = searchedQuery.location?.trim().toLowerCase();
            const ind = searchedQuery.industry?.trim().toLowerCase();
            const sal = searchedQuery.salary;

            const filteredJobs = allJobs.filter((job) => {
                const locationMatch = !searchedQuery.location ||
                    (job.location && job.location.toLowerCase().includes(loc));

                const industryMatch = !searchedQuery.industry ||
                    (job.industry?.toLowerCase().includes(ind)) ||
                    (job.title?.toLowerCase().includes(ind));

                const salaryMatch = (() => {
                    if (!sal) return true;
                    const [min, max] = JSON.parse(sal);
                    return job.salary >= min && job.salary <= max;
                })();

                return locationMatch && industryMatch && salaryMatch;
            });

            setFilterJobs(filteredJobs);
        } else {
            setFilterJobs(allJobs);
        }
    }, [allJobs, searchedQuery]);

    return (
        <div>
            <Navbar />
            <div className='max-w-7xl mx-auto mt-6 px-4'>
                <div className='flex gap-6'>
                    {/* Filter section */}
                    <div className='w-[22%]'>
                        <FilterCard />
                    </div>

                    {/* Job cards */}
                    <div className='w-[78%]'>
                        {
                            filterJobs.length === 0 ? (
                                <p className='text-center text-gray-500 mt-10'>No jobs found matching your criteria.</p>
                            ) : (
                                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
                                    {
                                        filterJobs.map((job) => (
                                            <motion.div
                                                key={job?._id}
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ duration: 0.3 }}
                                            >
                                                <Job job={job} />
                                            </motion.div>
                                        ))
                                    }
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Jobs;
