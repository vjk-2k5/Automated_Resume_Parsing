'use client';
import React from 'react';
import { Button, Spacer, Badge, Avatar } from '@nextui-org/react';
import { Card, CardBody, CardHeader } from '@nextui-org/react';
import { title } from "@/components/primitives";

const AboutPage = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-4 max-w-3xl mx-auto p-8 md:p-12">
      <div>
        <h1 style={{ textAlign: 'center', color: '#2C3E50' }}>
          <span className={title({ color: "Blue" })}>About Us</span>
        </h1>
      </div>

      <h3 style={{ textAlign: 'center', marginBottom: '40px', color: '#27AE60' }}>
        Welcome to Our 
        <span className={title({ color: "green" })}> Resume Parser</span> App!
      </h3>

      <Card css={{ marginBottom: '40px', padding: '32px', boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)' }}>
        <CardHeader>
          <h4 style={{ color: '#2980B9', margin: 0 }}>Who We Are</h4>
        </CardHeader>
        <CardBody>
          <p style={{ lineHeight: '1.6', color: '#34495E' }}>
            At our company, we believe in simplifying the hiring process. Our Resume Parser App uses advanced technology to extract meaningful information from resumes, making it easier for employers and job seekers to connect. We are dedicated to enhancing the recruitment experience through innovation and efficiency.
          </p>
        </CardBody>
      </Card>

      <Card css={{ marginBottom: '40px', padding: '32px', boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)' }}>
        <CardHeader>
          <h4 style={{ color: '#2980B9', margin: 0 }}>Our Mission</h4>
        </CardHeader>
        <CardBody>
          <p style={{ lineHeight: '1.6', color: '#34495E' }}>
            Our mission is to empower companies with the tools they need to find the best talent. We strive to provide a seamless and user-friendly platform that automates the parsing process, allowing recruiters to focus on what they do best—building great teams.
          </p>
        </CardBody>
      </Card>

      <Card css={{ marginBottom: '40px', padding: '32px', boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)' }}>
        <CardHeader>
          <h4 style={{ color: '#2980B9', margin: 0 }}>What We Offer</h4>
        </CardHeader>
        <CardBody>
          <p style={{ lineHeight: '1.6', color: '#34495E' }}>
            Our Resume Parser App offers various features, including:
          </p>
          <p style={{ lineHeight: '1.6', color: '#34495E' }}>
            Efficient resume data extraction,
            Customizable parsing options,
            Integration with various HR systems,
            User-friendly interface,
            Robust support and resources,
          </p>
          
        </CardBody>
      </Card>

      <h4 style={{ textAlign: 'center', margin: '40px 0', color: '#8E44AD' }}>Meet Our Team</h4>
      <div style={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap' }}>
        {['John Doe', 'Jane Smith', 'Emily Johnson'].map((name) => (
          <div key={name} style={{ textAlign: 'center', margin: '20px' }}>
            <Avatar
              size="lg"
              src={`https://i.pravatar.cc/150?u=${name}`} // Placeholder images
              alt={name}
              css={{ marginBottom: '10px' }}
            />
            <h5 style={{ color: '#27AE60' }}>{name}</h5>
            <Badge color="primary" variant="flat">
              Team Member
            </Badge>
          </div>
        ))}
      </div>

      <Spacer y={1.5} />

      <div style={{ textAlign: 'center' }}>
        <Button color="primary" auto>
          Learn More
        </Button>
      </div>
    </div>
  );
};

export default AboutPage;
