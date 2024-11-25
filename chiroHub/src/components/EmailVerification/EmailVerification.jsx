import React, { useEffect, useState } from 'react';
import Nav from '../Nav/Nav';
import Footer from '../Footer/Footer';
import { getUserFromLocalStorage, updateToken } from '../../utils/auth_service';
import { useNavigate } from 'react-router-dom';

export default function VerifyEmail() {
    const navigate = useNavigate()
    const [message, setMessage] = useState('You are not verified');
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState(getUserFromLocalStorage());
    const [verificationCode, setVerificationCode] = useState(['', '', '', '']); // Array to store each digit 

    const handleGenerateVerificationToken = () => {
        setLoading(true);
        fetch(`/chiro/generate-verification-token/${user.email}`)
            .then(res => res.json())
            .then((response) => {
                if (response) {
                    setMessage('Email Verification code sent');
                }
            })
            .catch((error) => {
                console.log(error)
                setMessage(error.response?.data?.message || 'Failed to resend verification email');
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const handleInputChange = (e, index) => {
        const value = e.target.value;
        if (value.length <= 1 && /^[0-9]*$/.test(value)) {
            const newCode = [...verificationCode];
            newCode[index] = value;
            setVerificationCode(newCode);

            // Automatically focus on the next input if the current input is filled
            if (value && index < 3) {
                document.getElementById(`input-${index + 1}`).focus();
            }
        }
    };

    const handleKeyDown = (e, index) => {
        if (e.key === 'Backspace' && !verificationCode[index] && index > 0) {
            // Focus on the previous input if the current input is empty and the user presses backspace
            document.getElementById(`input-${index - 1}`).focus();
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true);
        await fetch(`/chiro/verify-email/${user.email}/${verificationCode.join('')}`)
            .then(res => res.json())
            .then((response) => {
                setMessage(response.message);
            })
            .catch((error) => {
                setMessage(error.response?.data?.message || 'Failed to resend verification email');
            })
            .finally(() => {
                setLoading(false);
            });

        await updateToken(user)
        setUser(getUserFromLocalStorage())
    }
    return (
        <>
            <Nav incoming_user={user} />
            {user?.is_verified ? 'You are verified' :
            <>
            <div>
                {loading ? 'Loading...' : message}
            </div>
            <form onSubmit={handleSubmit}>
                <div style={{ display: 'flex', gap: '5px' }}>
                    {[0, 1, 2, 3].map((index) => (
                        <input
                        key={index}
                        id={`input-${index}`}
                        type="text"
                        value={verificationCode[index]}
                        onChange={(e) => handleInputChange(e, index)}
                        onKeyDown={(e) => handleKeyDown(e, index)}
                        maxLength={1}
                        placeholder="—"
                        style={{
                            width: '40px',
                            height: '40px',
                            textAlign: 'center',
                            fontSize: '20px',
                        }}
                        />
                        ))}
                </div>
                <button>Verify Email</button>
            </form>
            <button onClick={handleGenerateVerificationToken} disabled={loading}>
                Generate New Verification Code
            </button>
            </> }
            <Footer />
        </>
    );
}
