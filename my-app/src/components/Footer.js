import React from "react";

// Footer Compnent if you include in a return in components it will appear at the bottom of the page same goes form Button, Header, and SimpleForm
const Footer = () => {
    return (
        <footer style={{
            position: 'relative',
            bottom: 0,
            zIndex: 99,
            width: '100%',
            padding: '1rem 0 1rem 0',
            backgroundColor: 'rgba(16, 15, 28, 1)', // Solid background
            color: '#ffffff',
            textAlign: 'center',
            borderTop: '1px solid rgba(255, 255, 255, 0.1)', // Optional border
            fontFamily: '"Inter", system-ui, sans-serif',
            }}>
            <p>
                Call or Text us: 
                <a href="tel:+19083071999" style={{
                color: '#DC66FF',
                textDecoration: 'none',
                marginLeft: '0.5rem',
                }}>+1 (908) 307-1999</a>
            </p>
            <p>
                Email us: <a href="mailto:doquantumresearch@gmail.com" style={{
                color: '#DC66FF',
                textDecoration: 'none',
                cursor: 'pointer',
                }}>doquantumresearch@gmail.com</a>
            </p>
            <p>
                Join our Discord: <a href="https://discord.gg/XgBdREfAQ7" style={{ // Discord invite link
                color: '#DC66FF',
                textDecoration: 'none',
                cursor: 'pointer', 
                }}>https://discord.gg/XgBdREfAQ7</a> 
            </p> 
            <p>
                Follow us on Instgaram: <a href="https://www.instagram.com/doquantum?igsh=MW02M2w2NXhrbHJ6MQ==&utm_source=ig_contact_invite" style={{ // Instagram link
                color: '#DC66FF',
                textDecoration: 'none',
                cursor: 'pointer',
                }}>@doquantum</a>
            </p>
            
            <p>
                Also Check out our LinkedIn: <a href="https://www.linkedin.com/company/do-quantum" style={{  //placeholder LinkedIn link WILL UPDATE
                    color: '#DC66FF',
                    textDecoration: 'none',
                    cursor: 'pointer',
                }} > LinkedIn </a>
            </p>
        </footer>
    );
};

export default Footer;