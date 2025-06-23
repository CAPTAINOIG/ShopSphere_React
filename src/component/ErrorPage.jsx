import React from 'react';
import { useNavigate } from 'react-router-dom';

const ErrorPage = ({
  statusCode = 404,
  title = "Oops! Page Not Found",
  message = "The page you're looking for doesn't exist or has been moved.",
  showRedirect = true,
  redirectText = "Go Back Home",
  redirectPath = "/",
  showImage = true,
  imageSrc = "", // Allow custom override
}) => {
  const navigate = useNavigate();

  // Reliable SVG illustrations from public sources
  const errorIllustrations = {
    404: "https://www.svgrepo.com/show/491978/file-not-found.svg",
    403: "https://www.svgrepo.com/show/491983/no-permission.svg",
    500: "https://www.svgrepo.com/show/504663/server-error.svg",
    default: "https://www.svgrepo.com/show/510014/alert-octagon.svg"
  };

  const getIllustration = () => {
    return imageSrc || errorIllustrations[statusCode] || errorIllustrations.default;
  };

  const handleRedirect = () => {
    navigate(redirectPath);
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      textAlign: 'center',
      padding: '2rem',
      backgroundColor: '#f9f9f9',
    }}>
      {showImage && (
        <img
          src={getIllustration()}
          alt="Error illustration"
          style={{
            width: '200px',
            height: 'auto',
            marginBottom: '2rem',
          }}
          onError={(e) => {
            // Fallback to simple emoji if image fails
            e.target.style.display = 'none';
            const fallback = document.createElement('div');
            fallback.textContent = statusCode === 404 ? '🔍' : '⚠️';
            fallback.style.fontSize = '100px';
            fallback.style.marginBottom = '1rem';
            e.target.parentNode.insertBefore(fallback, e.target.nextSibling);
          }}
        />
      )}

      <h1 style={{ 
        fontSize: '2.5rem',
        color: '#333',
        marginBottom: '1rem',
      }}>
        {statusCode && <span style={{ color: 'pink' }}>{statusCode} - </span>}
        {title}
      </h1>

      <p style={{ 
        fontSize: '1.1rem',
        color: '#666',
        maxWidth: '600px',
        marginBottom: '2rem',
        lineHeight: '1.6'
      }}>
        {message}
      </p>

      {showRedirect && (
        <button
          onClick={handleRedirect}
          style={{
            padding: '12px 24px',
            backgroundColor: 'pink',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '1rem',
            fontWeight: '500',
            transition: 'all 0.3s ease',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.backgroundColor = 'pink';
            e.currentTarget.style.transform = 'translateY(-2px)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.backgroundColor = 'pink';
            e.currentTarget.style.transform = 'translateY(0)';
          }}
        >
          {redirectText}
        </button>
      )}
    </div>
  );
};

export default ErrorPage;