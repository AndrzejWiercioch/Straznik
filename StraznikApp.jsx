
// Strażnik – Webowa aplikacja ochrony rodziny
// MVP z lokalnym zapisem danych i podglądem

import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function StraznikApp() {
  // Kapsuła czasu
  const [capsuleTitle, setCapsuleTitle] = useState("");
  const [capsuleMessage, setCapsuleMessage] = useState("");
  const [capsuleDate, setCapsuleDate] = useState("");
  const [savedCapsule, setSavedCapsule] = useState(null);

  // Finanse
  const [savings, setSavings] = useState("");
  const [expenses, setExpenses] = useState("");
  const [savedFinance, setSavedFinance] = useState(null);

  // Plan awaryjny
  const [emergencyInstructions, setEmergencyInstructions] = useState("");
  const [savedEmergency, setSavedEmergency] = useState("");

  // Wczytanie danych z localStorage przy starcie
  useEffect(() => {
    const capsule = localStorage.getItem("capsule");
    if (capsule) setSavedCapsule(JSON.parse(capsule));

    const finance = localStorage.getItem("finance");
    if (finance) setSavedFinance(JSON.parse(finance));

    const emergency = localStorage.getItem("emergency");
    if (emergency) setSavedEmergency(emergency);
  }, []);

  // Zapis kapsuły
  const saveCapsule = () => {
    const data = { title: capsuleTitle, message: capsuleMessage, date: capsuleDate };
    localStorage.setItem("capsule", JSON.stringify(data));
    setSavedCapsule(data);
    alert("📦 Kapsuła czasu zapisana!");
  };

  // Zapis finansów
  const saveFinance = () => {
    const data = { savings, expenses };
    localStorage.setItem("finance", JSON.stringify(data));
    setSavedFinance(data);
    alert("💰 Plan finansowy zapisany!");
  };

  // Zapis awaryjny
  const saveEmergency = () => {
    localStorage.setItem("emergency", emergencyInstructions);
    setSavedEmergency(emergencyInstructions);
    alert("🛡️ Plan awaryjny zapisany!");
  };

  return (
    <main className="min-h-screen bg-gray-100 p-6 grid gap-6">
      <h1 className="text-3xl font-bold">Strażnik Rodziny</h1>

      {/* Kapsuła Czasu */}
      <Card>
        <CardContent className="grid gap-4">
          <h2 className="text-xl font-semibold">📦 Kapsuła Czasu</h2>
          <Input value={capsuleTitle} onChange={(e) => setCapsuleTitle(e.target.value)} placeholder="Tytuł wiadomości (np. Dla mojej córki na 18.)" />
          <Textarea value={capsuleMessage} onChange={(e) => setCapsuleMessage(e.target.value)} placeholder="Twoja wiadomość..." rows={4} />
          <Input type="date" value={capsuleDate} onChange={(e) => setCapsuleDate(e.target.value)} />
          <Button onClick={saveCapsule}>📨 Zapisz wiadomość</Button>
          {savedCapsule && (
            <div className="text-sm text-gray-600 mt-4">
              <p><strong>📖 Zapisana kapsuła:</strong></p>
              <p><strong>Tytuł:</strong> {savedCapsule.title}</p>
              <p><strong>Data otwarcia:</strong> {savedCapsule.date}</p>
              <p><strong>Treść:</strong> {savedCapsule.message}</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Plan finansowy */}
      <Card>
        <CardContent className="grid gap-4">
          <h2 className="text-xl font-semibold">💰 Plan Finansowy</h2>
          <Input value={savings} onChange={(e) => setSavings(e.target.value)} placeholder="Kwota oszczędności" />
          <Input value={expenses} onChange={(e) => setExpenses(e.target.value)} placeholder="Miesięczne wydatki rodziny" />
          <Button onClick={saveFinance}>📊 Zobacz prognozę bezpieczeństwa</Button>
          {savedFinance && (
            <div className="text-sm text-gray-600 mt-4">
              <p><strong>📖 Zapisany plan:</strong></p>
              <p><strong>Oszczędności:</strong> {savedFinance.savings} zł</p>
              <p><strong>Wydatki miesięczne:</strong> {savedFinance.expenses} zł</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Plan awaryjny */}
      <Card>
        <CardContent className="grid gap-4">
          <h2 className="text-xl font-semibold">🛡️ Plan Awaryjny</h2>
          <Textarea value={emergencyInstructions} onChange={(e) => setEmergencyInstructions(e.target.value)} placeholder="Instrukcje awaryjne (np. co zrobić w razie mojej nieobecności)" rows={4} />
          <Button onClick={saveEmergency}>💾 Zapisz instrukcje</Button>
          {savedEmergency && (
            <div className="text-sm text-gray-600 mt-4">
              <p><strong>📖 Zapisane instrukcje:</strong></p>
              <p>{savedEmergency}</p>
            </div>
          )}
        </CardContent>
      </Card>
    </main>
  );
}
