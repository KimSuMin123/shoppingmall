import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import React from 'react';
import Header from "./header";
import eventPage from "../img/eventPageImg.jpg"

function EventPage() {
  return (
    <div>
        <Header/>
        <img
          src = {eventPage}
          />

    </div>
  );
}

export default EventPage;
