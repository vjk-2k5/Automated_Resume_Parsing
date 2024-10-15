'use client';
import { useState, useMemo } from 'react';
import { title, subtitle } from "@/components/primitives";
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell
} from '@nextui-org/table';
import { Input, Pagination, Spacer } from '@nextui-org/react';

// Sample Data
const members = [
  { name: 'Alice Johnson', skills: 'JavaScript, React', exp: '3 years', prevCompany: 'TechCorp', designation: 'Frontend Developer' },
  { name: 'Bob Smith', skills: 'Python, Django', exp: '5 years', prevCompany: 'DataX', designation: 'Backend Developer' },
  { name: 'Carol Lee', skills: 'Java, Spring', exp: '4 years', prevCompany: 'CodeHouse', designation: 'Full Stack Developer' },
  { name: 'David Kim', skills: 'AWS, Docker', exp: '2 years', prevCompany: 'Cloudify', designation: 'DevOps Engineer' },
  { name: 'Eva Green', skills: 'UI/UX, Figma', exp: '6 years', prevCompany: 'DesignLab', designation: 'Product Designer' },
];

export function TeamTable (){
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const itemsPerPage = 10;

  // Filtered Data based on Search Query
  const filteredMembers = useMemo(() => {
    return members.filter((member) =>
      member.skills.toLowerCase().includes(query.toLowerCase())
    );
  }, [query]);

  // Pagination Logic
  const totalPages = Math.ceil(filteredMembers.length / itemsPerPage);
  const currentItems = filteredMembers.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h1 className={title({ color: "green" })}>Filter</h1>
      {/* Search Input */}
      <Input
        clearable
        underlined
        labelPlaceholder="Search by skill"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        fullWidth
      />
      <Spacer y={1.5} />

      {/* Table */}
      <Table aria-label="Team Members Table" css={{ height: 'auto', minWidth: '100%' }}>
        <TableHeader>
          <TableColumn>Name</TableColumn>
          <TableColumn>Skills</TableColumn>
          <TableColumn>Experience</TableColumn>
          <TableColumn>Previous Company</TableColumn>
          <TableColumn>Designation</TableColumn>
        </TableHeader>
        <TableBody>
          {currentItems.map((member, index) => (
            <TableRow key={index}>
              <TableCell>{member.name}</TableCell>
              <TableCell>{member.skills}</TableCell>
              <TableCell>{member.exp}</TableCell>
              <TableCell>{member.prevCompany}</TableCell>
              <TableCell>{member.designation}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Spacer y={1.5} />

      {/* Pagination */}
      <Pagination
        total={totalPages}
        initialPage={1}
        page={page}
        onChange={(page) => setPage(page)}
      />
    </div>
  );
};
export default TeamTable;