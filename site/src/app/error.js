"use client"
import React from 'react';

function error({error}) {
    console.log(error);
    return (
        <div>
         <h2>에러 페이지입니다!!</h2>
        </div>
    );
}

export default error;