"use client"
import { DiagramType } from "@/types/uml-types"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Users,
  AlignVerticalJustifyCenter,
  GitBranch,
  Workflow,
  Network,
  Timer,
  LayoutGrid,
  ChevronDown,
  HelpCircle,
} from "lucide-react"
import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

interface UMLDiagramSelectorProps {
  currentType: DiagramType
  onChange: (type: DiagramType) => void
}

const diagramTypeInfo = {
  [DiagramType.UseCase]: {
    name: "Use Case Diagram",
    icon: Users,
    description: "Shows how users interact with a system",
    details:
      "Use Case diagrams capture the functional requirements of a system. They illustrate the interactions between users (actors) and the system, showing what the system does from an external observer's point of view.",
  },
  [DiagramType.Sequence]: {
    name: "Sequence Diagram",
    icon: AlignVerticalJustifyCenter,
    description: "Shows the sequence of messages between objects",
    details:
      "Sequence diagrams show object interactions arranged in time sequence. They depict the objects and classes involved in the scenario and the sequence of messages exchanged between the objects needed to carry out the functionality.",
  },
  [DiagramType.Activity]: {
    name: "Activity Diagram",
    icon: Workflow,
    description: "Shows workflows and business processes",
    details:
      "Activity diagrams represent workflows of stepwise activities and actions with support for choice, iteration and concurrency. They are used to model business processes, workflows, and algorithmic logic.",
  },
  [DiagramType.State]: {
    name: "State Machine Diagram",
    icon: GitBranch,
    description: "Shows states of an object and transitions",
    details:
      "State Machine diagrams describe the behavior of a system by showing its states and the events that cause transitions from one state to another. They are particularly useful for modeling reactive systems.",
  },
  [DiagramType.Communication]: {
    name: "Communication Diagram",
    icon: Network,
    description: "Shows the structure of object communication",
    details:
      "Communication diagrams (formerly called collaboration diagrams) show the interactions between objects or parts in terms of sequenced messages. They represent a combination of information from Class, Sequence, and Use Case diagrams.",
  },
  [DiagramType.Timing]: {
    name: "Timing Diagram",
    icon: Timer,
    description: "Shows state changes over time",
    details:
      "Timing diagrams are a special form of sequence diagram where the focus is on timing constraints. They show state changes and interactions between objects along a time axis, which is particularly useful for real-time systems.",
  },
  [DiagramType.InteractionOverview]: {
    name: "Interaction Overview",
    icon: LayoutGrid,
    description: "Combines activity and sequence diagrams",
    details:
      "Interaction Overview diagrams are a variant of Activity diagrams that focus on the flow of control where the nodes are interactions or interaction uses. They provide a high-level view of the interactions in a system.",
  },
}

export function UMLDiagramSelector({ currentType, onChange }: UMLDiagramSelectorProps) {
  const currentInfo = diagramTypeInfo[currentType]
  const CurrentIcon = currentInfo.icon
  const [open, setOpen] = useState(false)

  return (
    <div className="flex items-center gap-2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            className="min-w-[280px] h-14 text-lg flex items-center justify-between gap-2 bg-primary/10 hover:bg-primary/20"
          >
            <div className="flex items-center gap-2">
              <CurrentIcon className="h-6 w-6 text-primary" />
              <span>{currentInfo.name}</span>
            </div>
            <ChevronDown className="h-5 w-5 opacity-70" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="center" className="w-[280px]">
          {Object.entries(diagramTypeInfo).map(([type, info]) => {
            const Icon = info.icon
            return (
              <DropdownMenuItem
                key={type}
                className="flex flex-col items-start p-3 cursor-pointer"
                onClick={() => onChange(type as DiagramType)}
              >
                <div className="flex items-center gap-2 font-medium">
                  <Icon className="h-5 w-5 text-primary" />
                  <span>{info.name}</span>
                </div>
                <span className="text-xs text-muted-foreground mt-1">{info.description}</span>
              </DropdownMenuItem>
            )
          })}
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" size="icon" className="h-14 w-14 bg-primary/10 hover:bg-primary/20">
            <HelpCircle className="h-6 w-6 text-primary" />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <CurrentIcon className="h-5 w-5 text-primary" />
              <span>{currentInfo.name}</span>
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <p>{currentInfo.details}</p>
            <h4 className="text-sm font-medium">Common Elements:</h4>
            <ul className="list-disc pl-5 text-sm space-y-1">
              {currentType === DiagramType.UseCase && (
                <>
                  <li>
                    <span className="font-medium">Actor:</span> External entity that interacts with the system
                  </li>
                  <li>
                    <span className="font-medium">Use Case:</span> Specific functionality provided by the system
                  </li>
                  <li>
                    <span className="font-medium">Association:</span> Connection between actors and use cases
                  </li>
                </>
              )}
              {currentType === DiagramType.Sequence && (
                <>
                  <li>
                    <span className="font-medium">Lifeline:</span> Represents an object or participant in the
                    interaction
                  </li>
                  <li>
                    <span className="font-medium">Message:</span> Communication between lifelines
                  </li>
                  <li>
                    <span className="font-medium">Activation:</span> Period when an object is performing an action
                  </li>
                </>
              )}
              {currentType === DiagramType.Activity && (
                <>
                  <li>
                    <span className="font-medium">Action:</span> A step in the activity
                  </li>
                  <li>
                    <span className="font-medium">Decision:</span> A branch in the flow based on a condition
                  </li>
                  <li>
                    <span className="font-medium">Start/End:</span> Initial and final nodes of the activity
                  </li>
                </>
              )}
              {currentType === DiagramType.State && (
                <>
                  <li>
                    <span className="font-medium">State:</span> Condition of an object at a specific time
                  </li>
                  <li>
                    <span className="font-medium">Transition:</span> Change from one state to another
                  </li>
                  <li>
                    <span className="font-medium">Initial/Final:</span> Starting and ending points
                  </li>
                </>
              )}
              {currentType === DiagramType.Communication && (
                <>
                  <li>
                    <span className="font-medium">Object:</span> Instance of a class
                  </li>
                  <li>
                    <span className="font-medium">Message:</span> Communication between objects with sequence numbers
                  </li>
                  <li>
                    <span className="font-medium">Link:</span> Connection between communicating objects
                  </li>
                </>
              )}
              {currentType === DiagramType.Timing && (
                <>
                  <li>
                    <span className="font-medium">Timeline:</span> Represents time progression
                  </li>
                  <li>
                    <span className="font-medium">State:</span> Condition of an object at specific times
                  </li>
                  <li>
                    <span className="font-medium">State change:</span> Transition between states
                  </li>
                </>
              )}
              {currentType === DiagramType.InteractionOverview && (
                <>
                  <li>
                    <span className="font-medium">Frame:</span> Contains interaction diagrams
                  </li>
                  <li>
                    <span className="font-medium">Activity:</span> Control flow between interactions
                  </li>
                  <li>
                    <span className="font-medium">Start/End:</span> Initial and final nodes
                  </li>
                </>
              )}
            </ul>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

