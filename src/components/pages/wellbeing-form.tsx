"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { PersonalInfoStep } from "@/components/form-steps/personal-info-step"
import { AcademicStep } from "@/components/form-steps/academic-step"
import { LifestyleStep } from "@/components/form-steps/lifestyle-step"
import { MentalHealthStep } from "@/components/form-steps/mental-health-step"
import { SuccessStep } from "@/components/form-steps/success-step"
import { Heart, ArrowLeft, ArrowRight } from "lucide-react"

interface PredictionResult {
  prediction: number
  message?: string
}

export default function WellbeingForm() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    gender: "",
    age: "",
    academicPressure: "",
    cgpa: "",
    studySatisfaction: "",
    sleepDuration: "",
    otherSleepDuration: "",
    dietaryHabits: "",
    otherDietaryHabits: "",
    degree: "",
    degreeType: "",
    degreeName: "",
    suicidalThoughts: "",
    studyHours: "",
    financialStress: "",
    familyHistory: "",
  })

  const [predictionResult, setPredictionResult] = useState<PredictionResult | null>(null)

  const [validationErrors, setValidationErrors] = useState<Record<string, boolean>>({})
  const [showValidationMessage, setShowValidationMessage] = useState(false)
  const [attemptedValidation, setAttemptedValidation] = useState(false)

  const totalSteps = 5
  const progress = (step / totalSteps) * 100

  const updateFormData = (data: Partial<typeof formData>) => {
    setFormData({ ...formData, ...data })
  }

  const nextStep = () => {
    if (validateCurrentStep()) {
      if (step < totalSteps) {
        setStep(step + 1)
        window.scrollTo(0, 0)
        setValidationErrors({})
        setShowValidationMessage(false)
        setAttemptedValidation(false)
      }
    }
  }

  const prevStep = () => {
    if (step > 1) {
      setStep(step - 1)
      window.scrollTo(0, 0)
      setValidationErrors({})
      setShowValidationMessage(false)
      setAttemptedValidation(false)
    }
  }

  const validateCurrentStep = () => {
    let isValid = true
    const errors: Record<string, boolean> = {}

    if (step === 1) {
      if (!formData.gender) {
        errors.gender = true
        isValid = false
      }
      if (!formData.age) {
        errors.age = true
        isValid = false
      }
    } else if (step === 2) {
      if (!formData.degree) {
        errors.degree = true
        isValid = false
      }
      if (
        (formData.degree === "Bachelor" || formData.degree === "Master" || formData.degree === "Doctorate") &&
        !formData.degreeType
      ) {
        errors.degreeType = true
        isValid = false
      }

      if (
        (formData.degree === "Bachelor" || formData.degree === "Master" || formData.degree === "Doctorate") &&
        formData.degreeType === "Others" &&
        !formData.degreeName
      ) {
        errors.degreeName = true
        isValid = false
      }
      if (!formData.cgpa) {
        errors.cgpa = true
        isValid = false
      }
      if (!formData.academicPressure) {
        errors.academicPressure = true
        isValid = false
      }
      if (!formData.studySatisfaction) {
        errors.studySatisfaction = true
        isValid = false
      }
    } else if (step === 3) {
      if (!formData.sleepDuration) {
        errors.sleepDuration = true
        isValid = false
      }
      if (formData.sleepDuration === "Others" && !formData.otherSleepDuration) {
        errors.otherSleepDuration = true
        isValid = false
      }
      if (!formData.dietaryHabits) {
        errors.dietaryHabits = true
        isValid = false
      }
      if (formData.dietaryHabits === "Others" && !formData.otherDietaryHabits) {
        errors.otherDietaryHabits = true
        isValid = false
      }
      if (!formData.studyHours) {
        errors.studyHours = true
        isValid = false
      }
    } else if (step === 4 && attemptedValidation) {
      if (!formData.financialStress) {
        errors.financialStress = true
        isValid = false
      }
      if (!formData.familyHistory) {
        errors.familyHistory = true
        isValid = false
      }
      if (!formData.suicidalThoughts) {
        errors.suicidalThoughts = true
        isValid = false
      }
    }

    setValidationErrors(errors)

    if (!isValid) {
      setShowValidationMessage(true)
      setTimeout(() => setShowValidationMessage(false), 3000)
    }

    return isValid
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    setAttemptedValidation(true)

    if (!validateCurrentStep()) {
      return
    }

    try {
      const data = {
        ...formData,
        age: Number.parseFloat(formData.age),
        academicPressure: Number.parseInt(formData.academicPressure),
        cgpa: Number.parseFloat(formData.cgpa),
        studySatisfaction: Number.parseInt(formData.studySatisfaction),
        studyHours: Number.parseInt(formData.studyHours),
        financialStress: Number.parseInt(formData.financialStress),
      }

      const response = await fetch("https://depression-learning-backend-production.up.railway.app/api/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })

      const result = await response.json()
      console.log("Response from server:", result)

      setPredictionResult(result)

      setStep(5)
      window.scrollTo(0, 0)
    } catch (error) {
      console.error("Error saving assessment:", error)
    }
  }

  return (
    <Card className="p-6 rounded-3xl shadow-lg border-0 bg-white/80 backdrop-blur-sm">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Heart className="text-pink-500" size={24} />
          <span className="font-medium text-purple-700">
            Step {step} of {totalSteps}
          </span>
        </div>
        <div className="text-sm text-gray-500">
          {step === 1 && "Personal Information"}
          {step === 2 && "Academic Details"}
          {step === 3 && "Lifestyle Factors"}
          {step === 4 && "Mental Wellbeing"}
          {step === 5 && "Results"}
        </div>
      </div>

      <Progress
        value={progress}
        className="h-2 mb-8 bg-gray-100"
        indicatorClassName="bg-gradient-to-r from-pink-500 to-purple-500"
      />

      {showValidationMessage && (
        <div className="mb-6 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm animate-fade-in">
          Please fill in all required fields before proceeding.
        </div>
      )}

      <form onSubmit={handleSubmit}>
        {step === 1 && (
          <PersonalInfoStep formData={formData} updateFormData={updateFormData} validationErrors={validationErrors} />
        )}

        {step === 2 && (
          <AcademicStep formData={formData} updateFormData={updateFormData} validationErrors={validationErrors} />
        )}

        {step === 3 && (
          <LifestyleStep formData={formData} updateFormData={updateFormData} validationErrors={validationErrors} />
        )}

        {step === 4 && (
          <MentalHealthStep formData={formData} updateFormData={updateFormData} validationErrors={validationErrors} />
        )}

        {step === 5 && <SuccessStep predictionResult={predictionResult} />}

        <div className="flex justify-between mt-8">
          {step > 1 && step < 5 && (
            <Button
              type="button"
              onClick={prevStep}
              variant="outline"
              className="flex items-center gap-2 rounded-full px-6"
            >
              <ArrowLeft size={16} />
              Back
            </Button>
          )}

          {step < 4 && (
            <Button
              type="button"
              onClick={nextStep}
              className="ml-auto flex items-center gap-2 rounded-full px-6 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
            >
              Next
              <ArrowRight size={16} />
            </Button>
          )}

          {step === 4 && (
            <Button
              type="submit"
              className="ml-auto flex items-center gap-2 rounded-full px-6 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
            >
              Submit
              <ArrowRight size={16} />
            </Button>
          )}
        </div>
      </form>
    </Card>
  )
}
