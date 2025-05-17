"use client"
import { Phone, ExternalLink, AlertTriangle, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface PredictionResult {
  prediction: number
  message?: string
}

interface SuccessStepProps {
  predictionResult: PredictionResult | null
}

export function SuccessStep({ predictionResult }: SuccessStepProps) {
  const prediction = predictionResult?.prediction || 0

  const getRiskLevel = () => {
    if (!predictionResult) return { level: "Unknown", color: "gray" }

    const prediction = predictionResult.prediction

    if (prediction < 0.3) {
      return { level: "Low Risk", color: "#22c55e" }
    } else if (prediction < 0.7) {
      return { level: "Moderate Risk", color: "#f97316" }
    } else {
      return { level: "High Risk", color: "#ef4444" }
    }
  }

  const risk = getRiskLevel()

  const predictionPercent = predictionResult ? `${Math.round(predictionResult.prediction * 100)}%` : "N/A"

  return (
    <div className="text-center space-y-8 py-4">
      <div className="flex justify-center">
        <div className="rounded-full bg-purple-100 p-3">
          <Info className="h-12 w-12 text-purple-600" />
        </div>
      </div>

      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-gray-800">Your Assessment Results</h2>
        <p className="text-gray-600 max-w-md mx-auto">
          Based on your responses, we've analyzed factors that may contribute to depression risk.
        </p>
      </div>

      <div className="flex flex-col items-center justify-center mt-8">
        <div className="relative">
          <SemiCircleProgressBar
            value={prediction * 100}
            max={100}
            color={risk.color}
            width={240}
            strokeWidth={15}
            showPercentage={false}
          />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 translate-y-4 text-3xl font-bold">
            {predictionPercent}
          </div>
        </div>

        <div className="mt-2 text-lg font-bold" style={{ color: risk.color }}>
          {risk.level}
        </div>
        <p className="text-gray-600 max-w-md mx-auto text-sm mt-2">
          Depression risk indicator based on your assessment
        </p>
      </div>

      {risk.level === "High Risk" && (
        <div className="bg-red-50 rounded-xl p-4 max-w-md mx-auto border border-red-200">
          <div className="flex items-start gap-3">
            <AlertTriangle className="text-red-500 flex-shrink-0 mt-1" size={20} />
            <div className="text-left">
              <h3 className="font-medium text-red-800 text-sm">Important Notice</h3>
              <p className="text-red-700 text-sm mt-1">
                Your responses indicate a higher risk of depression. We strongly recommend speaking with a mental health
                professional for proper evaluation and support.
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="bg-purple-50 rounded-xl p-6 max-w-md mx-auto">
        <h3 className="font-medium text-purple-800 mb-2">Support Resources</h3>
        <p className="text-sm text-purple-700 mb-4">
          If you're experiencing distress or need someone to talk to, please reach out to these resources:
        </p>

        <div className="space-y-3">
          <div className="flex items-center gap-2 text-left">
            <Phone size={18} className="text-purple-600 flex-shrink-0" />
            <div>
              <p className="font-medium text-gray-800">Crisis Helpline</p>
              <p className="text-sm text-gray-600">1-800-273-8255</p>
            </div>
          </div>

          <Button
            variant="outline"
            className="w-full justify-start gap-2 border-purple-200 text-purple-700 hover:bg-purple-50 hover:text-purple-800"
            asChild
          >
            <Link href="https://www.nimh.nih.gov/health/find-help" target="_blank">
              <ExternalLink size={16} />
              Mental Health Resources
            </Link>
          </Button>

          <Button
            variant="outline"
            className="w-full justify-start gap-2 border-purple-200 text-purple-700 hover:bg-purple-50 hover:text-purple-800"
            asChild
          >
            <Link href="https://www.crisistextline.org/" target="_blank">
              <ExternalLink size={16} />
              Crisis Text Line
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

interface SemiCircleProgressBarProps {
  value: number
  max: number
  color: string
  width: number
  strokeWidth: number
  showPercentage?: boolean
  className?: string
}

function SemiCircleProgressBar({
  value,
  max,
  color,
  width,
  strokeWidth,
  showPercentage = true,
  className = "",
}: SemiCircleProgressBarProps) {
  const radius = width / 2 - strokeWidth / 2
  const diameter = radius * 2
  const circumference = Math.PI * diameter

  const progress = Math.min(Math.max(value / max, 0), 1)

  const dashOffset = circumference * (1 - progress / 2)

  return (
    <div className={`relative ${className}`} style={{ width: `${width}px`, height: `${width / 2}px` }}>
      <svg 
        width={width} 
        height={width / 2} 
        style={{ overflow: "visible" }}
      >
        <g transform={`rotate(-180 ${width/2} ${width/2})`}>
          {/* Background arc */}
          <circle
            cx={width / 2}
            cy={width / 2}
            r={radius}
            fill="none"
            stroke="#e5e7eb"
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={circumference / 2}
          />
          
          <circle
            cx={width / 2}
            cy={width / 2}
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={dashOffset}
            strokeLinecap="round"
            style={{ transition: "stroke-dashoffset 1s ease-in-out" }}
          />
        </g>
      </svg>
    </div>
  )
}
