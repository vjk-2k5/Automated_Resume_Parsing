'use client';
import { useState, useMemo } from 'react';
import { title } from "@/components/primitives";
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell
} from '@nextui-org/table';
import { Input, Pagination, Spacer, Button, Divider, Dropdown } from '@nextui-org/react';
import { DropdownMenu ,DropdownItem , DropdownTrigger } from '@nextui-org/dropdown';
import { TableCellsIcon } from '@heroicons/react/24/outline';
// Sample Data (25 entries)
const members = [
  { name: 'Alice Johnson', skills: 'JavaScript, React', exp: '3 years', prevCompany: 'TechCorp', designation: 'Frontend Developer' },
  { name: 'Bob Smith', skills: 'Python, Django', exp: '5 years', prevCompany: 'DataX', designation: 'Backend Developer' },
  { name: 'Carol Lee', skills: 'Java, Spring', exp: '4 years', prevCompany: 'CodeHouse', designation: 'Full Stack Developer' },
  { name: 'David Kim', skills: 'AWS, Docker', exp: '2 years', prevCompany: 'Cloudify', designation: 'DevOps Engineer' },
  { name: 'Eva Green', skills: 'UI/UX, Figma', exp: '6 years', prevCompany: 'DesignLab', designation: 'Product Designer' },
  { name: 'Alice Johnson', skills: 'JavaScript, React', exp: '3 years', prevCompany: 'TechCorp', designation: 'Frontend Developer' },
  { name: 'Bob Smith', skills: 'Python, Django', exp: '5 years', prevCompany: 'DataX', designation: 'Backend Developer' },
  { name: 'Carol Lee', skills: 'Java, Spring', exp: '4 years', prevCompany: 'CodeHouse', designation: 'Full Stack Developer' },
  { name: 'David Kim', skills: 'AWS, Docker', exp: '2 years', prevCompany: 'Cloudify', designation: 'DevOps Engineer' },
  { name: 'Eva Green', skills: 'UI/UX, Figma', exp: '6 years', prevCompany: 'DesignLab', designation: 'Product Designer' },
  { name: 'Frank White', skills: 'C++, Rust', exp: '7 years', prevCompany: 'Games Inc', designation: 'Game Developer' },
  { name: 'Grace Park', skills: 'PHP, Laravel', exp: '5 years', prevCompany: 'WebNow', designation: 'Backend Developer' },
  { name: 'Henry Adams', skills: 'JavaScript, Node.js', exp: '4 years', prevCompany: 'Serverify', designation: 'Backend Developer' },
  { name: 'Ivy Thomas', skills: 'Flutter, Dart', exp: '3 years', prevCompany: 'MobileX', designation: 'Mobile Developer' },
  { name: 'John Doe', skills: 'HTML, CSS', exp: '1 year', prevCompany: 'Freelance', designation: 'Frontend Developer' },
  { name: 'Kimberly Ross', skills: 'Python, FastAPI', exp: '6 years', prevCompany: 'QuickApps', designation: 'Backend Developer' },
  { name: 'Liam Walker', skills: 'AWS, Kubernetes', exp: '5 years', prevCompany: 'Cloudify', designation: 'DevOps Engineer' },
  { name: 'Mona Davis', skills: 'React Native, JavaScript', exp: '4 years', prevCompany: 'AppZone', designation: 'Mobile Developer' },
  { name: 'Nathan Ford', skills: 'Angular, TypeScript', exp: '6 years', prevCompany: 'WebCode', designation: 'Frontend Developer' },
  { name: 'Olivia Brown', skills: 'Figma, Sketch', exp: '7 years', prevCompany: 'Designify', designation: 'UI/UX Designer' },
  { name: 'Peter Collins', skills: 'Java, Hibernate', exp: '5 years', prevCompany: 'JavaWorks', designation: 'Backend Developer' },
  { name: 'Quincy Evans', skills: 'Golang, Microservices', exp: '6 years', prevCompany: 'APIWorks', designation: 'Backend Developer' },
  { name: 'Rachel Taylor', skills: 'HTML, CSS, JS', exp: '3 years', prevCompany: 'FrontendLab', designation: 'Frontend Developer' },
  { name: 'Steven White', skills: 'Ruby on Rails', exp: '4 years', prevCompany: 'CodeExpress', designation: 'Backend Developer' },
  { name: 'Tina Young', skills: 'Flutter, Firebase', exp: '5 years', prevCompany: 'AppMaker', designation: 'Mobile Developer' },
  { name: 'Uma Patel', skills: 'React, Redux', exp: '6 years', prevCompany: 'StateLab', designation: 'Frontend Developer' },
  { name: 'Victor Lee', skills: 'Docker, Jenkins', exp: '4 years', prevCompany: 'Buildify', designation: 'DevOps Engineer' },
  { name: 'Wendy Green', skills: 'UI/UX, Adobe XD', exp: '5 years', prevCompany: 'UXLab', designation: 'Product Designer' },
  { name: 'Xavier Johnson', skills: 'PHP, Laravel', exp: '7 years', prevCompany: 'WebWorld', designation: 'Backend Developer' },
  { name: 'Yara Ahmed', skills: 'Python, Pandas', exp: '3 years', prevCompany: 'DataScienceX', designation: 'Data Scientist' },
];

export function TeamTable() {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [compactView, setCompactView] = useState(false);

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

  // Handle Compact View Toggle
  const handleCompactViewToggle = () => {
    setCompactView((prev) => !prev);
  };

  // Handle Rows per Page Change
  const handleRowsPerPageChange = (value) => {
    setItemsPerPage(parseInt(value));
    setPage(1); // Reset to the first page when items per page changes
  };

  return (
    <div style={{ padding: '40px', maxWidth: '1200px', margin: '0 auto' }}>
      <h1 className={title({ color: "green" })}>Filter</h1>

      {/* Search Bar and Action Buttons */}
      <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '20px' }}>
        <Input
          clearable
          underlined
          label="Search By skills"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          fullWidth
          css={{ flex: 1 }}
        />

        <Dropdown>
          <DropdownTrigger flat size="sm">
          <Button>☰</Button></DropdownTrigger>
          <DropdownMenu
            aria-label="Select number of rows"
            selectionMode="single"
            selectedKeys={[itemsPerPage.toString()]}
            onAction={handleRowsPerPageChange}
          >
            <DropdownItem key="5">5 Rows</DropdownItem>
            <DropdownItem key="10">10 Rows</DropdownItem>
            <DropdownItem key="20">20 Rows</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>

      <Divider />

      {/* Table */}
      <Table
        aria-label="Team Members Table"
        css={{
          height: 'auto',
          width: '100%',
          minWidth: '1200px',
          borderCollapse: 'separate',
          borderSpacing: '0 10px', // Add spacing between rows
          ...(compactView && { fontSize: '12px', padding: '5px' })
        }}
      >
        <TableHeader>
          <TableColumn>Name</TableColumn>
          <TableColumn>Skills</TableColumn>
          <TableColumn>Experience</TableColumn>
          <TableColumn>Previous Company</TableColumn>
          <TableColumn>Designation</TableColumn>
        </TableHeader>
        <TableBody>
          {currentItems.map((member, index) => (
            <TableRow key={index} css={{ height: compactView ? '40px' : '60px' }}>
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
}

export default TeamTable;
