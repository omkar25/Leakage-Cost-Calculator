"use client";

import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { formatCurrency, formatNumber } from "@/lib/utils";
import { Calculator, Clock, Calendar, DollarSign, Users, TrendingDown, AlertTriangle, LogOut } from "lucide-react";
import { signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";

interface InputFieldProps {
  id: string;
  label: string;
  value: number;
  onChange: (value: number) => void;
  icon: React.ReactNode;
  suffix?: string;
  step?: number;
  min?: number;
}

function InputField({ id, label, value, onChange, icon, suffix, step = 0.5, min = 0 }: InputFieldProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id} className="flex items-center gap-2 text-zinc-700 dark:text-zinc-300">
        {icon}
        {label}
      </Label>
      <div className="relative">
        <Input
          id={id}
          type="number"
          value={value}
          onChange={(e) => onChange(parseFloat(e.target.value) || 0)}
          step={step}
          min={min}
          className="pr-12 text-lg font-medium"
        />
        {suffix && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-zinc-500">
            {suffix}
          </span>
        )}
      </div>
    </div>
  );
}

interface MetricCardProps {
  title: string;
  value: string;
  description: string;
  icon: React.ReactNode;
  highlight?: boolean;
}

function MetricCard({ title, value, description, icon, highlight = false }: MetricCardProps) {
  return (
    <Card className={highlight ? "border-red-500 bg-red-50 dark:bg-red-950/20" : ""}>
      <CardHeader className="pb-2">
        <CardDescription className="flex items-center gap-2">
          {icon}
          {title}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className={`text-2xl font-bold ${highlight ? "text-red-600 dark:text-red-400" : "text-zinc-900 dark:text-zinc-100"}`}>
          {value}
        </p>
        <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">{description}</p>
      </CardContent>
    </Card>
  );
}

export default function LeakageCalculator() {
  const [hoursWasted, setHoursWasted] = useState(2.5);
  const [daysPerMonth, setDaysPerMonth] = useState(20);
  const [daysPerYear, setDaysPerYear] = useState(230);
  const [hourlyRate, setHourlyRate] = useState(35);
  const [numAgents, setNumAgents] = useState(200);

  const calculations = useMemo(() => {
    const wastedHoursPerAgentPerYear = hoursWasted * daysPerYear;
    const costPerAgentPerMonth = hoursWasted * daysPerMonth * hourlyRate;
    const costPerAgentPerYear = hoursWasted * daysPerYear * hourlyRate;
    const totalTeamCostPerMonth = costPerAgentPerMonth * numAgents;
    const totalAnnualLeakage = hoursWasted * daysPerYear * hourlyRate * numAgents;

    return {
      wastedHoursPerAgentPerYear,
      costPerAgentPerMonth,
      costPerAgentPerYear,
      totalTeamCostPerMonth,
      totalAnnualLeakage,
    };
  }, [hoursWasted, daysPerMonth, daysPerYear, hourlyRate, numAgents]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-50 to-zinc-100 dark:from-zinc-950 dark:to-zinc-900 py-8 px-4">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex justify-end">
          <Button
            variant="outline"
            size="sm"
            onClick={() => signOut({ callbackUrl: "/login" })}
            className="flex items-center gap-2"
          >
            <LogOut className="h-4 w-4" />
            Sign Out
          </Button>
        </div>
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center gap-3">
            <Calculator className="h-10 w-10 text-red-500" />
            <h1 className="text-4xl font-bold text-zinc-900 dark:text-zinc-100">
              Leakage Cost Calculator
            </h1>
          </div>
          <p className="text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
            Calculate the hidden cost of wasted time across your support team. 
            Adjust the inputs below to see real-time impact on your bottom line.
          </p>
        </div>

        {/* Input Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingDown className="h-5 w-5 text-zinc-500" />
              Input Parameters
            </CardTitle>
            <CardDescription>
              Adjust these values to match your team&apos;s situation
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
              <InputField
                id="hoursWasted"
                label="Hours Wasted/Day"
                value={hoursWasted}
                onChange={setHoursWasted}
                icon={<Clock className="h-4 w-4" />}
                suffix="hrs"
                step={0.5}
              />
              <InputField
                id="daysPerMonth"
                label="Working Days/Month"
                value={daysPerMonth}
                onChange={setDaysPerMonth}
                icon={<Calendar className="h-4 w-4" />}
                suffix="days"
                step={1}
              />
              <InputField
                id="daysPerYear"
                label="Working Days/Year"
                value={daysPerYear}
                onChange={setDaysPerYear}
                icon={<Calendar className="h-4 w-4" />}
                suffix="days"
                step={1}
              />
              <InputField
                id="hourlyRate"
                label="Hourly Rate"
                value={hourlyRate}
                onChange={setHourlyRate}
                icon={<DollarSign className="h-4 w-4" />}
                suffix="$/hr"
                step={1}
              />
              <InputField
                id="numAgents"
                label="Number of Agents"
                value={numAgents}
                onChange={setNumAgents}
                icon={<Users className="h-4 w-4" />}
                suffix="agents"
                step={1}
              />
            </div>
          </CardContent>
        </Card>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <MetricCard
            title="Wasted Hours/Agent/Year"
            value={formatNumber(calculations.wastedHoursPerAgentPerYear)}
            description={`${hoursWasted} hrs × ${daysPerYear} days`}
            icon={<Clock className="h-4 w-4" />}
          />
          <MetricCard
            title="Cost/Agent/Month"
            value={formatCurrency(calculations.costPerAgentPerMonth)}
            description={`${hoursWasted} hrs × ${daysPerMonth} days × $${hourlyRate}`}
            icon={<DollarSign className="h-4 w-4" />}
          />
          <MetricCard
            title="Cost/Agent/Year"
            value={formatCurrency(calculations.costPerAgentPerYear)}
            description={`${hoursWasted} hrs × ${daysPerYear} days × $${hourlyRate}`}
            icon={<DollarSign className="h-4 w-4" />}
          />
          <MetricCard
            title="Team Cost/Month"
            value={formatCurrency(calculations.totalTeamCostPerMonth)}
            description={`${formatCurrency(calculations.costPerAgentPerMonth)} × ${numAgents} agents`}
            icon={<Users className="h-4 w-4" />}
          />
        </div>

        {/* Total Annual Leakage - Prominent Display */}
        <Card className="border-2 border-red-500 bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-950/30 dark:to-orange-950/30">
          <CardContent className="py-8">
            <div className="text-center space-y-4">
              <div className="flex items-center justify-center gap-2">
                <AlertTriangle className="h-6 w-6 text-red-500" />
                <h2 className="text-xl font-semibold text-zinc-700 dark:text-zinc-300">
                  Total Annual Leakage
                </h2>
              </div>
              <p className="text-6xl font-bold text-red-600 dark:text-red-400">
                {formatCurrency(calculations.totalAnnualLeakage)}
              </p>
              <p className="text-zinc-600 dark:text-zinc-400 max-w-xl mx-auto">
                This is the total cost of wasted time across your entire support team per year.
              </p>
            </div>
          </CardContent>
        </Card>

      </div>
    </div>
  );
}
