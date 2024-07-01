import React from 'react';

interface EmailTemplateProps {
  username: string;
  promptTitle: string;
  promptDescription: string;
  promptLink: string;
}

const EmailTemplate = ({ username, promptTitle, promptDescription, promptLink }: any) => {
  return (
    <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: '600px', margin: '0 auto', padding: '20px', backgroundColor: '#f4f4f4' }}>
      {/* <div style={{ backgroundColor: '#007bff', padding: '10px 20px', textAlign: 'center' }}>
        <img src="https://your-logo-url.com/logo.png" alt="Logo" style={{ width: '150px' }} />
      </div> */}
      <div style={{ backgroundColor: '#ffffff', padding: '20px', borderRadius: '8px' }}>
        <h2 style={{ color: '#333333' }}>Hello {username},</h2>
        <p style={{ color: '#555555' }}>
          A new prompt titled <strong>{promptTitle}</strong> has been uploaded by a user you follow.
        </p>
        <p style={{ color: '#555555' }}>{promptDescription}</p>
        <a
          href={promptLink}
          style={{
            display: 'inline-block',
            backgroundColor: '#007bff',
            color: '#ffffff',
            padding: '10px 20px',
            borderRadius: '5px',
            textDecoration: 'none',
            marginTop: '10px'
          }}
        >
          View Prompt
        </a>
      </div>
      <div style={{ backgroundColor: '#007bff', padding: '10px 20px', textAlign: 'center', marginTop: '20px' }}>
        <p style={{ color: '#ffffff' }}>© 2024 PromptLab. All rights reserved.</p>
      </div>
    </div>
  );
};

export default EmailTemplate;