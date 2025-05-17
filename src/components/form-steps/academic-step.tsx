"use client"

import { useState, useEffect } from "react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { GraduationCap, BookOpen, Award } from "lucide-react"

interface AcademicStepProps {
  formData: any
  updateFormData: (data: any) => void
  validationErrors: Record<string, boolean>
}

export function AcademicStep({ formData, updateFormData, validationErrors }: AcademicStepProps) {
  const [showDegreeName, setShowDegreeName] = useState(
    formData.degree === "Bachelor" || formData.degree === "Master" || formData.degree === "Doctorate",
  )
  const [showCustomDegree, setShowCustomDegree] = useState(formData.degreeType === "Others")

  useEffect(() => {
    setShowDegreeName(formData.degree === "Bachelor" || formData.degree === "Master" || formData.degree === "Doctorate")
  }, [formData.degree])

  useEffect(() => {
    setShowCustomDegree(formData.degreeType === "Others")
  }, [formData.degreeType])

  const handleDegreeChange = (value: string) => {
    updateFormData({
      degree: value,
      degreeType: "",
      degreeName: "",
    })
    setShowDegreeName(value === "Bachelor" || value === "Master" || value === "Doctorate")
  }

  const handleDegreeTypeChange = (value: string) => {
    updateFormData({ degreeType: value })
    setShowCustomDegree(value === "Others")
  }

  const bachelorDegrees = [
    "B.Ed",
    "B.Com",
    "B.Arch",
    "BCA",
    "B.Tech",
    "BHM",
    "BSc",
    "B.Pharm",
    "BBA",
    "LLB",
    "BE",
    "BA",
    "Others",
  ]

  const masterDegrees = ["MSc", "MCA", "M.Tech", "M.Ed", "M.Com", "M.Pharm", "MD", "MBA", "MA", "MHM", "ME", "Others"]

  const doctorateDegrees = ["PhD", "Others"]

  const getDegreeOptions = () => {
    if (formData.degree === "Bachelor") return bachelorDegrees
    if (formData.degree === "Master") return masterDegrees
    if (formData.degree === "Doctorate") return doctorateDegrees
    return []
  }

  return (
    <div className="space-y-6">
      <div className="bg-blue-100 rounded-2xl p-4 mb-6">
        <h2 className="text-xl font-semibold text-blue-800 flex items-center gap-2 mb-2">
          <GraduationCap className="text-blue-600" />
          Academic Information
        </h2>
        <p className="text-blue-700 text-sm">Tell us about your academic experience and pressures.</p>
      </div>

      <div className="space-y-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <BookOpen className="text-blue-600" size={18} />
            <Label htmlFor="degree" className="text-gray-700 font-medium flex items-center">
              Education Level <span className="text-red-500 ml-1">*</span>
            </Label>
          </div>
          <Select value={formData.degree} onValueChange={handleDegreeChange}>
            <SelectTrigger
              className={`w-full rounded-xl ${
                validationErrors.degree ? "border-red-300 ring-1 ring-red-300" : "border-gray-300"
              }`}
            >
              <SelectValue placeholder="Select your education level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="High School and lower">High School and lower</SelectItem>
              <SelectItem value="Bachelor">Bachelor</SelectItem>
              <SelectItem value="Master">Master</SelectItem>
              <SelectItem value="Doctorate">Doctorate</SelectItem>
            </SelectContent>
          </Select>
          {validationErrors.degree && <p className="text-red-500 text-sm mt-1">Education level is required</p>}

          {showDegreeName && (
            <div className="mt-4 space-y-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Award className="text-blue-600" size={18} />
                  <Label htmlFor="degreeType" className="text-gray-700 font-medium flex items-center">
                    Degree Type <span className="text-red-500 ml-1">*</span>
                  </Label>
                </div>
                <Select value={formData.degreeType} onValueChange={handleDegreeTypeChange}>
                  <SelectTrigger
                    className={`w-full rounded-xl ${
                      validationErrors.degreeType ? "border-red-300 ring-1 ring-red-300" : "border-gray-300"
                    }`}
                  >
                    <SelectValue placeholder={`Select your ${formData.degree}'s degree`} />
                  </SelectTrigger>
                  <SelectContent>
                    {getDegreeOptions().map((degree) => (
                      <SelectItem key={degree} value={degree}>
                        {degree}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {validationErrors.degreeType && <p className="text-red-500 text-sm mt-1">Degree type is required</p>}
              </div>

              {showCustomDegree && (
                <div>
                  <Label htmlFor="degreeName" className="text-gray-700 text-sm flex items-center">
                    Please specify your degree <span className="text-red-500 ml-1">*</span>
                  </Label>
                  <Input
                    id="degreeName"
                    value={formData.degreeName}
                    onChange={(e) => updateFormData({ degreeName: e.target.value })}
                    className={`mt-1 rounded-xl ${
                      validationErrors.degreeName
                        ? "border-red-300 focus:border-red-500 focus:ring-red-500"
                        : "border-gray-300"
                    }`}
                    placeholder="E.g., Computer Science, Business Administration"
                  />
                  {validationErrors.degreeName && <p className="text-red-500 text-sm mt-1">Degree name is required</p>}
                </div>
              )}
            </div>
          )}
        </div>

        <div>
          <Label htmlFor="cgpa" className="text-gray-700 font-medium flex items-center">
            CGPA <span className="text-red-500 ml-1">*</span>
          </Label>
          <Input
            id="cgpa"
            type="number"
            step="0.01"
            min="0"
            max="4.0"
            value={formData.cgpa}
            onChange={(e) => updateFormData({ cgpa: e.target.value })}
            className={`mt-1 rounded-xl ${
              validationErrors.cgpa ? "border-red-300 focus:border-red-500 focus:ring-red-500" : "border-gray-300"
            }`}
            placeholder="Enter your CGPA"
          />
          {validationErrors.cgpa && <p className="text-red-500 text-sm mt-1">CGPA is required</p>}
        </div>

        <div>
          <Label className="text-gray-700 font-medium flex items-center">
            Academic Pressure (0-5) <span className="text-red-500 ml-1">*</span>
          </Label>
          <div className="mt-2">
            <RadioGroup
              value={formData.academicPressure}
              onValueChange={(value) => updateFormData({ academicPressure: value })}
              className="flex flex-wrap gap-3"
            >
              {[0, 1, 2, 3, 4, 5].map((value) => (
                <div key={value} className="flex flex-col items-center">
                  <RadioGroupItem value={value.toString()} id={`academic-${value}`} className="sr-only" />
                  <Label
                    htmlFor={`academic-${value}`}
                    className={`
                      cursor-pointer h-12 w-12 rounded-full flex items-center justify-center text-lg font-medium
                      ${
                        formData.academicPressure === value.toString()
                          ? "bg-blue-600 text-white"
                          : "bg-blue-100 text-blue-800 hover:bg-blue-200"
                      }
                    `}
                  >
                    {value}
                  </Label>
                  <span className="text-xs mt-1 text-gray-500">
                    {value === 0 ? "None" : value === 5 ? "Extreme" : ""}
                  </span>
                </div>
              ))}
            </RadioGroup>
            {validationErrors.academicPressure && (
              <p className="text-red-500 text-sm mt-2">Academic pressure rating is required</p>
            )}
          </div>
        </div>

        <div>
          <Label className="text-gray-700 font-medium flex items-center">
            Study Satisfaction (0-5) <span className="text-red-500 ml-1">*</span>
          </Label>
          <div className="mt-2">
            <RadioGroup
              value={formData.studySatisfaction}
              onValueChange={(value) => updateFormData({ studySatisfaction: value })}
              className="flex flex-wrap gap-3"
            >
              {[0, 1, 2, 3, 4, 5].map((value) => (
                <div key={value} className="flex flex-col items-center">
                  <RadioGroupItem value={value.toString()} id={`study-${value}`} className="sr-only" />
                  <Label
                    htmlFor={`study-${value}`}
                    className={`
                      cursor-pointer h-12 w-12 rounded-full flex items-center justify-center text-lg font-medium
                      ${
                        formData.studySatisfaction === value.toString()
                          ? "bg-blue-600 text-white"
                          : "bg-blue-100 text-blue-800 hover:bg-blue-200"
                      }
                    `}
                  >
                    {value}
                  </Label>
                  <span className="text-xs mt-1 text-gray-500">{value === 0 ? "Low" : value === 5 ? "High" : ""}</span>
                </div>
              ))}
            </RadioGroup>
            {validationErrors.studySatisfaction && (
              <p className="text-red-500 text-sm mt-2">Study satisfaction rating is required</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
