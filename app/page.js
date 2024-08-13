'use client';

import { useState } from 'react';
import { Box, Stack, TextField, Button, Typography } from '@mui/material';

export default function Home() {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: 'Hello I am Mazins support Agent, how can I assist you today?'
    }
  ]);
  const [message, setMessage] = useState('');
  const [showLandingPage, setShowLandingPage] = useState(true);

  const sendMessage = async () => {
    setMessages((messages) => [
      ...messages,
      { role: "user", content: message },
      { role: "assistant", content: '' },
    ]);
    setMessage('');
    const response = fetch('/api/chat', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify([...messages, { role: "user", content: message }])
    }).then(async (res) => {
      const reader = res.body.getReader();
      const decoder = new TextDecoder();

      let result = '';
      return reader.read().then(function processText({ done, value }) {
        if (done) {
          return result;
        }
        const text = decoder.decode(value || new Uint8Array(), { stream: true });
        setMessages((messages) => {
          let lastMessage = messages[messages.length - 1];
          let otherMessages = messages.slice(0, messages.length - 1);
          return [
            ...otherMessages,
            {
              ...lastMessage,
              content: lastMessage.content + text,
            },
          ];
        });
        return reader.read().then(processText);
      });
    });
  };

  if (showLandingPage) {
    return (
      <Box 
        width="100vw" 
        height="100vh" 
        display="flex"
        justifyContent="center" 
        alignItems="center"
        sx={{
          background: 'linear-gradient(135deg, #213A57, #0B6477, #14919b, #0AD1C8, #45DFB1, #80ED99)',
          backgroundSize: '200% 200%',
          animation: 'gradientBackground 15s ease infinite',
          cursor: 'pointer'
        }}
        onClick={() => setShowLandingPage(false)}
      >
        <style jsx>{`
          @keyframes gradientBackground {
            0% { background-position: 0% 50% }
            50% { background-position: 100% 50% }
            100% { background-position: 0% 50% }
          }
        `}</style>
        <Typography 
          variant="h2" 
          color="white" 
          sx={{
            textShadow: '2px 2px 8px rgba(0, 0, 0, 0.7)',
            animation: 'pulse 1.5s infinite'
          }}
        >
          Click Anywhere
        </Typography>
        <style jsx>{`
          @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.05); }
            100% { transform: scale(1); }
          }
        `}</style>
      </Box>
    );
  }

  return (
    <Box 
      width="100vw" 
      height="100vh" 
      display="flex"
      flexDirection="row" 
      justifyContent="center" 
      alignItems="center"
      position="relative"
      sx={{
        background: 'linear-gradient(135deg, #213A57, #0B6477, #14919b, #0AD1C8, #45DFB1, #80ED99)',
        backgroundSize: '200% 200%',
        animation: 'gradientBackground 15s ease infinite',
        overflow: 'hidden'
      }}
    >
      <style jsx>{`
        @keyframes hover {
          0% { transform: translate3d(0, 80px, 0) }
          100% { transform: translate3d(0, 30px, 0) }
        }
        @keyframes shadow {
          0% {
            transform: translate3d(0, 0, 0) scale(1.5, 1.2);
            opacity: 0.4;
          }
          100% {
            transform: translate3d(0, 0, 0) scale(1, 1);
            opacity: 0.2;
          }
        }
        @keyframes arms_bounce_left {
          0% { transform: translate3d(0, 80px, 0) rotate(0deg) }
          100% { transform: translate3d(0, 30px, 0) rotate(-10deg) }
        }
        @keyframes arms_bounce_right {
          0% { transform: translate3d(0, 80px, 0) rotate(0deg) }
          100% { transform: translate3d(0, 30px, 0) rotate(10deg) }
        }
        @keyframes eyes_blink {
          0% { transform: scale(1, 1) }
          90% { transform: scale(1, 1) }
          95% { transform: scale(0.8, 0) }
          100% { transform: scale(1, 1) }
        }
        @keyframes gradientBackground {
          0% { background-position: 0% 50% }
          50% { background-position: 100% 50% }
          100% { background-position: 0% 50% }
        }
        #body {
          animation: hover 1.1s ease-in-out 0s infinite alternate;
        }
        #head {
          animation: hover 1.1s ease-in-out 0.05s infinite alternate;
        }
        #arms {
          animation: hover 1.1s ease-in-out 0.1s infinite alternate;
        }
        #left_arm {
          transform-origin: center right;
          animation: arms_bounce_left 1.1s ease-in-out 0s infinite alternate;
        }
        #right_arm {
          transform-origin: center left;
          animation: arms_bounce_right 1.1s ease-in-out 0s infinite alternate;
        }
        #eyes ellipse {
          transform-origin: center center;
          animation: eyes_blink 2s ease-out 0s infinite alternate;
        }
        #shadow {
          transform-origin: center center;
          animation: shadow 1.1s ease-in-out 0s infinite alternate;
        }
      `}</style>
      
      <Box 
        width="50%" 
        height="100%" 
        display="flex" 
        justifyContent="flex-end" 
        alignItems="center"
        pr={25}
        sx={{
          position: 'relative',
          zIndex: 1,
        }}
      >
        <svg viewBox="0 0 600 800" id="robot" height="500px">
          <ellipse id="shadow" opacity="0.4" fill="#2C3332" cx="300" cy="703.4" rx="89" ry="30.6"/>
          <g id="left_arm">
            <path fill="#BABEB7" d="M184 430.9c-44-18.9-84.8 18-94.2 44.1 -10.9-3.3-22.1-1.3-28.8 5.5 -1 1-1.8 2-2.6 3.2 -1.9 2.1-4.5 5.2-6.2 8.3 -5.8 10-2.3 23.1 7.7 32.4l3.8-3.7 5.7-7.1 -3.8 3.8c-6.8-6.4-10.6-14.6-10.5-22.3 -0.1 7.7 3.7 15.9 10.5 22.2l3.8-3.7c-4.8-5.1-6.7-11.7-4.8-17.3 5.6-3.5 13.8-3.4 21 0.8 8.7 5 13 14.3 10.5 21.7 -2.4 1.5-5.3 2.4-8.4 2.5l-5.7 7.1 0.1 6c8.5 0.8 16.5-1.6 21.7-6.8 1.2-1.2 6.3-7.3 7.2-8.8 0 0 0 0 0-0.1 0.6-0.8 1.1-1.5 1.6-2.4 5.5-9.5 2.6-22.1-6.4-31.2 13.2-12.9 33.1-25.2 48.8-9.1C156.5 477.4 189.1 433.1 184 430.9z"/>
            <path fill="#DCE0DA" d="M106.3 485c-2.4-2.4-5.2-4.6-8.4-6.5 -2.6-1.5-5.3-2.7-8.1-3.5 -10.9-3.3-22.1-1.3-28.8 5.5 -1.2 1.2-2.3 2.6-3.2 4.1 -5.8 10-2.3 23.3 7.7 32.5l3.8-3.7c-4.8-5.1-6.7-11.7-4.8-17.3 0.3-0.8 0.6-1.6 1.1-2.4 4.1-7.1 14.2-9.2 23.3-5.1 0.8 0.3 1.5 0.7 2.3 1.2 1.9 1.1 3.6 2.4 5.1 3.9 5.9 5.9 7.9 14 4.3 20.2 -1.1 2-2.7 3.5-4.6 4.7 -2.4 1.5-5.3 2.4-8.4 2.5l0.1 6c9.4 0.9 18.2-2.1 23.3-8.7 0.6-0.8 1.1-1.5 1.6-2.4C118.1 506.6 115.2 494.1 106.3 485z"/>
          </g>
          <g id="right_arm">
            <path fill="#DCE0DA" d="M547.7 492c-1.8-3-4.3-6.1-6.2-8.3 -0.8-1.2-1.6-2.2-2.6-3.2 -6.7-6.8-17.8-8.8-28.8-5.5 -9.3-26.1-50.2-63-94.1-44.1 -5.1 2.2 27.5 46.5 28.9 45 15.6-16.1 35.6-3.8 48.8 9.1 -8.9 9.1-11.9 21.6-6.4 31.2 0.5 0.8 1 1.6 1.6 2.4 0 0 0 0 0 0.1 0.9 1.6 6 7.6 7.2 8.8 5.2 5.3 13.2 7.7 21.7 6.8l0.1-6 -5.7-7.1c-3.1-0.1-6-1-8.4-2.5 -2.5-7.5 1.8-16.7 10.5-21.7 7.2-4.2 15.5-4.2 21-0.8 1.9 5.6-0.1 12.2-4.8 17.3l3.8 3.7c6.8-6.3 10.6-14.5 10.5-22.2 0.2 7.8-3.6 16-10.5 22.3l-3.8-3.7 5.7 7 3.8 3.8C550 515.1 553.5 502 547.7 492z"/>
            <path fill="#BABEB7" d="M547.7 492c-3.1-5.4-8.8-11-8.8-11s0 0 0 0c1.2 1 2.3 2.4 3.2 3.9 5.8 10 2.3 23.1-7.7 32.4l-3.8-3.7 5.7 7 3.8 3.8C550 515.1 553.5 502 547.7 492z"/>
            <path fill="#BABEB7" d="M489 518.6C489 518.6 489 518.6 489 518.6c0.9 1.6 6 7.7 7.2 8.9 5.2 5.3 13.2 7.7 21.7 6.8l0.1-6 -5.7-7.1 -0.1 6C502.9 528.2 494.1 525.1 489 518.6z"/>
            <path fill="#BABEB7" d="M534.4 493.8c-4.1-7.1-14.2-9.2-23.3-5.1 -0.8 0.3-1.5 0.7-2.3 1.2 -1.9 1.1-3.6 2.4-5.1 3.9 -5.9 5.9-7.9 14-4.3 20.2 1.1 2 2.7 3.5 4.6 4.7 -2.5-7.5 1.8-16.7 10.5-21.7 7.2-4.2 15.5-4.2 21-0.8C535.2 495.4 534.8 494.6 534.4 493.8z"/>
          </g>
          <g id="robot_main">
            <g id="body">
              <path id="SVGID_3_" fill="#BABEB7" d="M137.4 525.6c0-47.9 60.7-219.3 162.6-219.3 101.9 0 162.6 171.9 162.6 219.3 0 47.5-137.9 56.4-162.6 56.4C275.3 582.1 137.4 573.5 137.4 525.6z"/>
              <path fill="#DCE0DA" d="M200.8 522.8c0.1-0.4 0.3-0.8 0.4-1.2C201 522 200.9 522.4 200.8 522.8z"/>
              <path fill="#DCE0DA" d="M200.2 524.6c0.1-0.4 0.2-0.8 0.3-1.1C200.5 523.8 200.3 524.2 200.2 524.6z"/>
              <path fill="#DCE0DA" d="M201.3 521.1c0.2-0.6 0.4-1.1 0.7-1.6C201.8 520 201.6 520.6 201.3 521.1z"/>
              <path fill="#DCE0DA" d="M198.9 534.8c0-0.7 0-1.4 0-2C198.9 533.4 198.9 534.1 198.9 534.8z"/>
              <path fill="#DCE0DA" d="M199.8 526.4c0.1-0.4 0.2-0.8 0.3-1.2C200 525.6 199.9 526 199.8 526.4z"/>
              <path fill="#DCE0DA" d="M438.8 437.2c-21.1 18.1-64.2 43.3-140.1 43.3 -67.7 0-86.4 14.8-96.7 39.2 -1.9 4.5-3.1 9.7-3.1 15.1 0 13.9 7.7 29.5 29.4 40.2 0 0 0 0 0 0 -0.3 0-0.5 0-0.8 0 0.3 0.1 0.5 0.3 0.8 0.4 31.4 5.2 61.4 6.7 71.7 6.7 24.7 0 162.6-8.9 162.6-56.4C462.6 508.1 454.3 473.7 438.8 437.2z"/>
              <path fill="#DCE0DA" d="M199 532.7c0-0.6 0.1-1.3 0.1-1.9C199.1 531.4 199 532.1 199 532.7z"/>
              <path fill="#DCE0DA" d="M199.2 530.3c0.1-0.5 0.1-1 0.2-1.4C199.3 529.4 199.2 529.9 199.2 530.3z"/>
              <path fill="#DCE0DA" d="M199.4 528.3c0.1-0.4 0.1-0.8 0.2-1.3C199.6 527.5 199.5 527.9 199.4 528.3z"/>
              <g id="percent_meter">
                <path fill="#EAECE8" d="M370.5 535.3c-0.1 0-0.2 0-0.4 0.1 -18 2.8-41.2 5-70 5 -44.7 0-75.9-5.2-95.4-10.1 0 0 0 0 0 0 0 0 0 0 0 0l-5.8 3c0 0 0 0 0 0 20 5.4 53.1 11.5 101.2 11.5 87.8 0 125-20 125-20l-4.5-3C420.7 521.8 405.2 529.8 370.5 535.3z"/>
                <path fill="#EAECE8" d="M175.2 524.9C175.2 524.9 175.2 524.9 175.2 524.9 175.2 524.9 175.2 524.9 175.2 524.9z"/>
                <path fill="#EAECE8" d="M175 524.8C175 524.8 175 524.8 175 524.8 175 524.8 175 524.8 175 524.8z"/>
                <polygon fill="#BABEB7" points="420.5 503.6 416.2 505.2 418.5 513.6 420.7 521.8 425.2 524.8 "/>
                <polygon fill="#8F918D" points="179.3 504 174.8 524.7 179.3 521.7 182.4 510.3 183.7 505.6 "/>
                <path fill="#BABEB7" d="M175 524.8c-0.2-0.1-0.2-0.1-0.2-0.1S174.9 524.7 175 524.8z"/>
                <path fill="#BABEB7" d="M175.2 524.9c1 0.5 3.9 1.9 9 3.8 6.6 2.5 14.6 4.5 14.7 4.6C184.8 529.4 177.1 525.8 175.2 524.9z"/>
                <path fill="#BABEB7" d="M175.2 524.9c-0.1 0-0.1-0.1-0.2-0.1C175.1 524.8 175.2 524.9 175.2 524.9z"/>
                <path fill="#BABEB7" d="M175.2 524.9C175.2 524.9 175.2 524.9 175.2 524.9c1.9 0.9 9.5 4.5 23.7 8.4 0 0 0 0 0 0l5.8-3c0 0 0 0 0 0 -0.6-0.1-1.2-0.3-1.7-0.4 -16.2-4.2-23.7-8.1-23.7-8.1l-4.5 2.9c0 0 0.1 0 0.2 0.1 0 0 0 0 0 0C175.1 524.8 175.2 524.9 175.2 524.9z"/>
                <path fill="#2b8fca" d="M368.7 521.5l-0.4-4.2c-18.5 3.2-41.7 5.8-68.2 5.8 -39.1 0-71.1-5.6-91.6-10.4 -0.5 1.7-0.9 3.2-1.3 4.6 -1.3 5-1.9 8.6-2.6 13 19.5 4.9 50.7 10.1 95.4 10.1 28.8 0 52-2.1 70-5L368.7 521.5z"/>
                <path fill="#2479b0" d="M203 511.3c-12.4-3.2-19.3-5.8-19.3-5.8l-1.3 4.7 -3.1 11.5c0 0 7.5 3.9 23.7 8.1 0.6 0.1 1.1 0.3 1.7 0.4 0 0 0 0 0 0 0.6-4.4 1.3-8 2.6-13 0.4-1.4 0.8-2.9 1.3-4.6C206.6 512.2 204.8 511.8 203 511.3z"/>
                <path fill="#4C4C4C" d="M418.5 513.6l-2.3-8.4c0 0-17.5 6.8-47.1 12 -0.2 0-0.5 0.1-0.7 0.1l0.4 4.2 1.4 13.9c0.1 0 0.2 0 0.4-0.1 34.7-5.5 50.2-13.5 50.2-13.5L418.5 513.6z"/>
              </g>
            </g>
            <g id="head">
              <path fill="#EAECE8" d="M460.3 268.3c-3-50.9-81.4-57.8-160.3-57.8 -78.8 0-156.6 6.9-160 57.4 -1.6 9.5-2.1 21.5-2.1 36.4 0 53.6 3.2 89.9 25.1 109.7 2 1.8 4.1 3.6 6.3 5.3 37.4 29.4 98.6 43.4 130.7 43.4 32.5 0 93.3-13.9 130.7-43.2 2.3-1.8 4.4-3.6 6.5-5.5 21.9-19.8 25.2-56.1 25.2-109.7C462.4 289.6 461.9 277.7 460.3 268.3z"/>
              <path fill="#9BB2B0" d="M444.4 302.4c-0.1-16.4-0.8-35.6-5.7-44 -1.3-2.3-3.6-6.2-19.4-7 -9.8-0.5-20.2-1-30.7-1.4 -33.2-1.3-67.8-1.9-88.7-1.9 -20.9 0-55.4 0.7-88.7 1.9 -10.5 0.4-20.8 0.9-30.5 1.4 -15.8 0.8-17.9 4.5-19.3 7 -4.7 8.2-5.5 26.8-5.6 43 0.1 46.6 1.8 76.4 17.2 90.4 2.3 2.1 4.9 4.2 7.5 6.2 33.3 24.9 89.7 38.8 119.4 38.8 17 0 61.7-7.6 95.1-25.3 7.6-4 14.6-8.6 20.6-13.7 12-10.3 19.9-22.7 19.9-37.7C435.6 299.2 417.4 267.5 388.7 249.9z"/>
              <path fill="#EAECE8" d="M428.2 391.7c-2.6 2.4-5.4 4.6-8.5 6.8 -4.4 3.2-9.3 6.3-14.4 9.1 -33.7 18.7-79.7 29-105.3 29 -29.7 0-86.1-14-119.4-38.8 -2.7-2-5.2-4-7.5-6.2 -15.4-14-17.1-43.8-17.2-90.4 0 1 0 2 0 3 0 50 3.1 81.8 19.2 96.4 0.9 0.8 1.7 1.5 2.6 2.3 32.3 27.2 91.1 41.7 122.3 41.7 28.6 0 80.5-12.2 113.8-35.1 3-2.1 5.8-4.2 8.5-6.4 1-0.8 1.9-1.6 2.9-2.5 7.9-7.2 12.7-18.6 15.6-34.2C438.3 377.5 434.5 385.9 428.2 391.7z"/>
              <g id="eyes">
                <ellipse fill="#2C3332" cx="231" cy="316.7" rx="6.3" ry="17"/>
                <ellipse fill="#2C3332" cx="369" cy="316.7" rx="6.3" ry="17"/>
              </g>
              <path fill="#DCE0DA" d="M460.3 268.3c-4-25.1-14.9-33.6-40-34.9 -41-2.2-92.3-3.3-120.3-3.3 -28 0-79.1 1.2-120.2 3.3 -25 1.3-35.8 9.8-39.8 34.5 -1.6 9.5-2.1 21.5-2.1 36.4 0 53.6 3.2 89.9 25.1 109.7 2 1.8 4.1 3.6 6.3 5.3 37.4 29.4 98.6 43.4 130.7 43.4 32.5 0 93.3-13.9 130.7-43.2 2.3-1.8 4.4-3.6 6.5-5.5 21.9-19.8 25.2-56.1 25.2-109.7C462.4 289.6 461.9 277.7 460.3 268.3zM444.4 313.7c-0.1 21.7-0.8 39.2-3.7 52.7 -2.8 15.6-7.6 27-15.6 34.2 -0.9 0.8-1.9 1.7-2.9 2.5 -2.7 2.2-5.5 4.4-8.5 6.4 -33.3 23-85.2 35.1-113.8 35.1 -31.2 0-90-14.5-122.3-41.7 -0.9-0.8-1.8-1.5-2.6-2.3 -16-14.6-19.2-46.4-19.2-96.4 0-1 0-2 0-3 0.1-16.2 0.9-34.8 5.6-43 1.4-2.5 3.5-6.2 19.3-7 9.7-0.5 20.1-1 30.5-1.4 33.2-1.3 67.8-1.9 88.7-1.9 20.9 0 55.5 0.7 88.7 1.9 10.5 0.4 20.9 0.9 30.7 1.4 15.8 0.8 18.1 4.7 19.4 7 4.8 8.4 5.6 27.6 5.7 44 0 0.7 0 1.3 0 1.9C444.4 307.5 444.4 310.6 444.4 313.7z"/>
              <g id="Robot_hat">
                <path fill="#DCE0DA" d="M354.3 220.3c0-29.9-24.3-54.2-54.2-54.2 -29.9 0-54.2 24.3-54.2 54.2 0 4.7 24.3 4.7 54.2 4.7C330.1 225 354.3 225 354.3 220.3z"/>
                <circle fill="#F0C419" cx="300.4" cy="207" r="8.1"/>
                <circle fill="#E64C3C" cx="324.7" cy="206" r="8.1"/>
                <circle fill="#4EBA64" cx="275.3" cy="206" r="8.1"/>
              </g>
            </g>
          </g>
        </svg>
      </Box>
      
      <Box 
        width="50%" 
        height="100%" 
        display="flex" 
        justifyContent="center" 
        alignItems="center"
        sx={{
          position: 'relative',
          zIndex: 1,
          backdropFilter: 'blur(8px)',
          backgroundColor: 'rgba(255, 255, 255, 0.7)',
          borderRadius: '12px',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
        }}
      >
        <Stack
          direction="column"
          width="600px"
          height="700px"
          border="1px solid rgba(0, 0, 0, 0.1)"
          padding={2}
          spacing={3}
          bgcolor="white"
        >
          <Stack
            direction="column"
            spacing={2}
            flexGrow={1}
            overflow="auto"
            maxHeight="100%"
          >
            {messages.map((message, index) => (
              <Box 
                key={index} 
                display="flex" 
                justifyContent={
                  message.role === 'assistant' ? 'flex-start' : 'flex-end'
                }
              >
                <Box 
                  sx={{
                    backgroundColor: message.role === 'assistant' ? 'primary.main' : 'secondary.main',
                    color: 'white',
                    borderRadius: '16px',
                    padding: '16px',
                    boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1)',
                    maxWidth: '70%',
                  }}
                >
                  {message.content}
                </Box>
              </Box>
            ))}
          </Stack>
          <Stack direction="row" spacing={2}>
            <TextField
              label="Message"
              fullWidth
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              variant="outlined"
              sx={{
                backgroundColor: 'rgba(255, 255, 255, 0.7)',
                borderRadius: '8px',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
              }}
            />
            <Button 
              variant="contained" 
              color="primary" 
              onClick={sendMessage}
              sx={{
                borderRadius: '8px',
                boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1)',
              }}
            >
              Send
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Box>
  );
}
