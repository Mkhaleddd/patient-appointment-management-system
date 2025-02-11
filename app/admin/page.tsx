"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { StatCard } from "@/components/StatCard";

const mockAppointments = [
  { id: 1, name: "John Doe", date: "2025-02-12", status: "Scheduled" },
  { id: 2, name: "Jane Smith", date: "2025-02-13", status: "Scheduled" },
  { id: 3, name: "Alice Johnson", date: "2025-02-10", status: "Completed" },
];

const AdminPage = () => {
  const [appointments, setAppointments] = useState(mockAppointments);
  const [search, setSearch] = useState("");

  // Filter appointments based on search input
  const filteredAppointments = appointments.filter((appt) =>
    appt.name.toLowerCase().includes(search.toLowerCase())
  );

  // Toggle Appointment Status
  const toggleStatus = (id: number) =>
    setAppointments((prev) =>
      prev.map((appt) => (appt.id === id ? { ...appt, status: appt.status === "Scheduled" ? "Completed" : "Scheduled" } : appt))
    );
  

  return (
    <div className="mx-auto flex max-w-7xl flex-col space-y-10 p-6">
      {/* Header */}
      <header className="flex items-center justify-between">
        <Link href="/" className="cursor-pointer">
          <Image src="/assets/icons/logo-full.svg" height={32} width={162} alt="logo" className="h-8 w-fit" />
        </Link>
        <p className="text-2xl font-semibold">Admin Dashboard</p>
      </header>

      {/* Welcome Section */}
      <section className="w-full space-y-2">
        <h1 className="text-3xl font-bold">Welcome 👋</h1>
        <p className="text-gray-600 dark:text-gray-400">Start the day with managing new appointments</p>
      </section>

      {/* Stats Section */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard type="appointments" count={appointments.length} label="Total Appointments" icon="/assets/icons/appointments.svg" />
        <StatCard type="pending" count={appointments.filter((appt) => appt.status === "Scheduled").length} label="Pending Appointments" icon="/assets/icons/pending.svg" />
        <StatCard type="cancelled" count={appointments.filter((appt) => appt.status === "Completed").length} label="Cancelled Appointments" icon="/assets/icons/cancelled.svg" />
      </section>

      {/* Search Bar */}
      <section className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Recent Appointments</h2>
        <Input type="text" placeholder="Search appointments..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-64" />
      </section>

      {/* Appointments Table */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredAppointments.length > 0 ? (
            filteredAppointments.map((appt) => (
              <TableRow key={appt.id}>
                <TableCell>{appt.name}</TableCell>
                <TableCell>{appt.date}</TableCell>
                <TableCell>
                  <span className={`px-3 py-1 rounded-lg text-white ${appt.status === "Scheduled" ? "bg-blue-500" : "bg-green-500"}`}>
                    {appt.status}
                  </span>
                </TableCell>
                <TableCell>
                  <Button onClick={() => toggleStatus(appt.id)} variant="outline" size="sm">
                    {appt.status === "Scheduled" ? "Mark as Completed" : "Cancel"}
                  </Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={4} className="text-center text-gray-500">
                No appointments found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default AdminPage;
