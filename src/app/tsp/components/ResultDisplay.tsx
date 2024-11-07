"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import ResultsLayout from "./graph-results/ResultsLayout"
import VisualizeTree from "./graph-results/VisualizeTree"
import TrackTabContent from "./graph-results/TrackTabContent"
import { useGraphState } from "@/store/useGraphStore"
import BABExplication from "./graph-results/BABExplication"

export default function ResultDisplay() {

  const { result, setActiveTab, isGraph} = useGraphState()
  const [activeTabresults, setActiveTabResults] = useState('track')

  return (
    <div className="space-y-6">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>TSP Solution Tree Visualization</CardTitle>
          {result?.type === 'branch-and-bound' && <CardDescription>Branch and Bound algorithm</CardDescription>}
          {result?.type === 'backtracking' && <CardDescription>BackTracking</CardDescription>}
        </CardHeader>
        <CardContent>
          {!result && !isGraph && 
              <div className="text-center text-gray-400 py-8">
                  <p>No graph data available</p>
                  <Button 
                      className="mt-4" 
                      onClick={() => setActiveTab('input')}
                  >
                      Load Sample Graph
                  </Button>
              </div>
          }    
          { isGraph && !result &&
              <div className="text-center text-gray-400 py-8">
                      <p>Graph is load but no track is generated</p>
                      <Button 
                          className="mt-4" 
                          onClick={() => setActiveTab('graph')}
                      >
                          Load visits
                      </Button>
              </div>
      }
          {result && result.type === 'branch-and-bound' && (
          <>
              <ResultsLayout />
              <Tabs value={activeTabresults} onValueChange={setActiveTabResults} className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="track">Track Path</TabsTrigger>
                  <TabsTrigger value="visualization">Tree Visualization</TabsTrigger>
                  <TabsTrigger value="explication">Branch and Bound</TabsTrigger>
                </TabsList>
                <TabsContent value="explication">
                  <BABExplication />
                </TabsContent>
                <TabsContent value="visualization">
                  <VisualizeTree />
                </TabsContent>
                <TabsContent value="track">
                  <TrackTabContent />
                </TabsContent>
              </Tabs>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  )
}