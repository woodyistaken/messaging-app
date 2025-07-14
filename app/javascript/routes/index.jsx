import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Profile from "../components/Profile";
import SignUpPortal from "../components/SignUpPortal";
import SignInPortal from "../components/SignInPortal";
import EditUserPortal from "../components/EditUserPortal";
import FindFriendPortal from "../components/FindFriendPortal";

export default (
  <Router>
    <Routes>
      <Route path="/" element={<Profile />} />
      <Route path="/sign_up" element={<SignUpPortal />} />
      <Route path="/sign_in" element={<SignInPortal />} />
      <Route path="/edit" element={<EditUserPortal />} />
      <Route path="/findFriends" element={<FindFriendPortal />} />
    </Routes>
  </Router>
);