import React from 'react';

function LaptopPage() {
    return (
        <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            width: '100vw', 
            height: '100vh', 
            backgroundColor: '#1e1e1e', 
            color: '#ffffff' 
        }}>
            <div style={{ 
                width: '80%', 
                height: '80%', 
                backgroundColor: '#2e2e2e', 
                border: '1px solid #ffffff', 
                borderRadius: '10px', 
                padding: '20px', 
                boxShadow: '0px 0px 20px rgba(255, 255, 255, 0.2)' 
            }}>
                <h1 style={{ textAlign: 'center' }}>Laptop UI</h1>
                <p style={{ textAlign: 'center' }}>이곳은 노트북 화면입니다.</p>
                <button 
                    onClick={() => window.history.back()} 
                    style={{
                        marginTop: '20px',
                        padding: '10px 20px',
                        fontSize: '16px',
                        borderRadius: '5px',
                        backgroundColor: '#4caf50',
                        color: '#ffffff',
                        border: 'none',
                        cursor: 'pointer'
                    }}
                >
                    돌아가기
                </button>
            </div>
        </div>
    );
}

export default LaptopPage;
