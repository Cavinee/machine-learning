"use client"

import { useState } from "react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Clock, Moon, Utensils } from "lucide-react"

interface LifestyleStepProps {
  formData: any
  updateFormData: (data: any) => void
  validationErrors: Record<string, boolean>
}

export function LifestyleStep({ formData, updateFormData, validationErrors }: LifestyleStepProps) {
  const [showOtherSleep, setShowOtherSleep] = useState(formData.sleepDuration === "Others")
  const [showOtherDiet, setShowOtherDiet] = useState(formData.dietaryHabits === "Others")

  const handleSleepChange = (value: string) => {
    updateFormData({ sleepDuration: value })
    setShowOtherSleep(value === "Others")
  }

  const handleDietChange = (value: string) => {
    updateFormData({ dietaryHabits: value })
    setShowOtherDiet(value === "Others")
  }

  return (
    <div className="space-y-6">
      <div className="bg-green-100 rounded-2xl p-4 mb-6">
        <h2 className="text-xl font-semibold text-green-800 flex items-center gap-2 mb-2">
          <Utensils className="text-green-600" />
          Lifestyle Factors
        </h2>
        <p className="text-green-700 text-sm">Your daily habits can significantly impact your wellbeing.</p>
      </div>

      <div className="space-y-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Moon className="text-green-600" size={18} />
            <Label htmlFor="sleepDuration" className="text-gray-700 font-medium flex items-center">
              Sleep Duration <span className="text-red-500 ml-1">*</span>
            </Label>
          </div>
          <Select value={formData.sleepDuration} onValueChange={handleSleepChange}>
            <SelectTrigger
              className={`w-full rounded-xl ${
                validationErrors.sleepDuration ? "border-red-300 ring-1 ring-red-300" : "border-gray-300"
              }`}
            >
              <SelectValue placeholder="Select your typical sleep duration" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Less than 5 hours">Less than 5 hours</SelectItem>
              <SelectItem value="5-6 hours">5-6 hours</SelectItem>
              <SelectItem value="7-8 hours">7-8 hours</SelectItem>
              <SelectItem value="More than 8 hours">More than 8 hours</SelectItem>
              <SelectItem value="Others">Others</SelectItem>
            </SelectContent>
          </Select>
          {validationErrors.sleepDuration && <p className="text-red-500 text-sm mt-1">Sleep duration is required</p>}

          {showOtherSleep && (
            <div className="mt-2">
              <Label htmlFor="otherSleepDuration" className="text-gray-700 text-sm flex items-center">
                Please specify <span className="text-red-500 ml-1">*</span>
              </Label>
              <Input
                id="otherSleepDuration"
                value={formData.otherSleepDuration}
                onChange={(e) => updateFormData({ otherSleepDuration: e.target.value })}
                className={`mt-1 rounded-xl ${
                  validationErrors.otherSleepDuration
                    ? "border-red-300 focus:border-red-500 focus:ring-red-500"
                    : "border-gray-300"
                }`}
                placeholder="Describe your sleep pattern"
              />
              {validationErrors.otherSleepDuration && (
                <p className="text-red-500 text-sm mt-1">Please specify your sleep pattern</p>
              )}
            </div>
          )}
        </div>

        <div>
          <div className="flex items-center gap-2 mb-2">
            <Utensils className="text-green-600" size={18} />
            <Label htmlFor="dietaryHabits" className="text-gray-700 font-medium flex items-center">
              Dietary Habits <span className="text-red-500 ml-1">*</span>
            </Label>
          </div>
          <Select value={formData.dietaryHabits} onValueChange={handleDietChange}>
            <SelectTrigger
              className={`w-full rounded-xl ${
                validationErrors.dietaryHabits ? "border-red-300 ring-1 ring-red-300" : "border-gray-300"
              }`}
            >
              <SelectValue placeholder="Select your dietary habits" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Unhealthy">Unhealthy</SelectItem>
              <SelectItem value="Moderate">Moderate</SelectItem>
              <SelectItem value="Healthy">Healthy</SelectItem>
              <SelectItem value="Others">Others</SelectItem>
            </SelectContent>
          </Select>
          {validationErrors.dietaryHabits && <p className="text-red-500 text-sm mt-1">Dietary habits are required</p>}

          {showOtherDiet && (
            <div className="mt-2">
              <Label htmlFor="otherDietaryHabits" className="text-gray-700 text-sm flex items-center">
                Please specify <span className="text-red-500 ml-1">*</span>
              </Label>
              <Input
                id="otherDietaryHabits"
                value={formData.otherDietaryHabits}
                onChange={(e) => updateFormData({ otherDietaryHabits: e.target.value })}
                className={`mt-1 rounded-xl ${
                  validationErrors.otherDietaryHabits
                    ? "border-red-300 focus:border-red-500 focus:ring-red-500"
                    : "border-gray-300"
                }`}
                placeholder="Describe your dietary habits"
              />
              {validationErrors.otherDietaryHabits && (
                <p className="text-red-500 text-sm mt-1">Please specify your dietary habits</p>
              )}
            </div>
          )}
        </div>

        <div>
          <div className="flex items-center gap-2 mb-2">
            <Clock className="text-green-600" size={18} />
            <Label htmlFor="studyHours" className="text-gray-700 font-medium flex items-center">
              Study Hours (per day) <span className="text-red-500 ml-1">*</span>
            </Label>
          </div>
          <Select value={formData.studyHours} onValueChange={(value) => updateFormData({ studyHours: value })}>
            <SelectTrigger
              className={`w-full rounded-xl ${
                validationErrors.studyHours ? "border-red-300 ring-1 ring-red-300" : "border-gray-300"
              }`}
            >
              <SelectValue placeholder="Select your daily study hours" />
            </SelectTrigger>
            <SelectContent>
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((hours) => (
                <SelectItem key={hours} value={hours.toString()}>
                  {hours} {hours === 1 ? "hour" : "hours"}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {validationErrors.studyHours && (
            <p className="text-red-500 text-sm mt-1">Work/study hours are required</p>
          )}
        </div>
      </div>
    </div>
  )
}
