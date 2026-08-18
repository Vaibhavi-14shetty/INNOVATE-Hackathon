"use client";

import dynamic from "next/dynamic";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import ElectricalChart from "@/components/electrical-chart";


const GridMap = dynamic(() => import("@/components/grid-map"), {
  ssr: false,
});

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="flex min-h-screen">

        {/* Sidebar */}
        <aside className="hidden w-64 shrink-0 border-r border-slate-800 bg-slate-950 p-5 md:block">
          <div className="mb-10">
            <h1 className="text-xl font-bold tracking-tight text-white">
              E-Vidyut Rakshak
            </h1>

            <p className="mt-1 text-xs text-slate-500">
              Rural Grid Intelligence
            </p>
          </div>

          <nav className="space-y-2">
            <div className="rounded-lg bg-slate-800 px-4 py-3 text-sm font-medium text-white">
              Control Room
            </div>

            <div className="cursor-pointer rounded-lg px-4 py-3 text-sm text-slate-400 transition hover:bg-slate-900 hover:text-white">
              Grid Network
            </div>

            <div className="cursor-pointer rounded-lg px-4 py-3 text-sm text-slate-400 transition hover:bg-slate-900 hover:text-white">
              Fault Alerts
            </div>

            <div className="cursor-pointer rounded-lg px-4 py-3 text-sm text-slate-400 transition hover:bg-slate-900 hover:text-white">
              Field Teams
            </div>
          </nav>
        </aside>

        {/* Main Content */}
        <section className="min-w-0 flex-1">

          {/* Header */}
          <header className="flex flex-col gap-4 border-b border-slate-800 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-2xl font-semibold text-white">
                Control Room
              </h2>

              <p className="mt-1 text-sm text-slate-400">
                Rural electricity grid monitoring and fault intelligence
              </p>
            </div>

            <Badge
              variant="outline"
              className="w-fit border-slate-700 bg-slate-900 px-4 py-2 text-slate-300"
            >
              <span className="mr-2 h-2 w-2 rounded-full bg-green-500" />
              System Online
            </Badge>
          </header>

          {/* Dashboard Content */}
          <div className="space-y-6 p-4 sm:p-6">

            {/* Overview Cards */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

              {/* Active Feeders */}
              <Card className="border-slate-800 bg-slate-900 text-white">
                <CardContent className="p-5">
                  <p className="text-sm text-slate-400">
                    Active Feeders
                  </p>

                  <p className="mt-2 text-3xl font-bold text-white">
                    24
                  </p>

                  <p className="mt-2 text-xs text-green-400">
                    All operational
                  </p>
                </CardContent>
              </Card>

              {/* Transformers */}
              <Card className="border-slate-800 bg-slate-900 text-white">
                <CardContent className="p-5">
                  <p className="text-sm text-slate-400">
                    Transformers
                  </p>

                  <p className="mt-2 text-3xl font-bold text-white">
                    86
                  </p>

                  <p className="mt-2 text-xs text-green-400">
                    84 online
                  </p>
                </CardContent>
              </Card>

              {/* Active Faults */}
              <Card className="border-slate-800 bg-slate-900 text-white">
                <CardContent className="p-5">
                  <p className="text-sm text-slate-400">
                    Active Faults
                  </p>

                  <p className="mt-2 text-3xl font-bold text-white">
                    3
                  </p>

                  <p className="mt-2 text-xs text-red-400">
                    Requires attention
                  </p>
                </CardContent>
              </Card>

              {/* Affected Villages */}
              <Card className="border-slate-800 bg-slate-900 text-white">
                <CardContent className="p-5">
                  <p className="text-sm text-slate-400">
                    Affected Villages
                  </p>

                  <p className="mt-2 text-3xl font-bold text-white">
                    7
                  </p>

                  <p className="mt-2 text-xs text-amber-400">
                    Monitoring
                  </p>
                </CardContent>
              </Card>

            </div>

            {/* Map + Alerts */}
            <div className="grid gap-6 lg:grid-cols-3">

              {/* Map */}
              <Card className="min-h-[420px] overflow-hidden border-slate-800 bg-slate-900 text-white lg:col-span-2">

                <div className="border-b border-slate-800 p-5">
                  <h3 className="font-semibold text-white">
                    Rural Grid Network
                  </h3>

                  <p className="mt-1 text-xs text-slate-500">
                    Live feeder and transformer status
                  </p>
                </div>

                <div className="h-[350px]">
                  <GridMap />
                </div>

              </Card>

              {/* Fault Alerts */}
              <Card className="border-slate-800 bg-slate-900 text-white">

                <div className="border-b border-slate-800 p-5">
                  <h3 className="font-semibold text-white">
                    Active Fault Alerts
                  </h3>

                  <p className="mt-1 text-xs text-slate-500">
                    AI-detected grid anomalies
                  </p>
                </div>

                <CardContent className="space-y-4 p-5">

                  {/* High Severity Alert */}
                  <div className="rounded-lg border border-red-900/50 bg-red-950/20 p-4">

                    <div className="flex items-center justify-between gap-3">
                      <p className="font-medium text-white">
                        Transformer Overload
                      </p>

                      <Badge
                        variant="outline"
                        className="border-red-900 text-red-400"
                      >
                        HIGH
                      </Badge>
                    </div>

                    <p className="mt-2 text-sm text-slate-400">
                      Transformer T-102
                    </p>

                    <p className="mt-1 text-sm text-slate-400">
                      Village: Khed
                    </p>

                    <p className="mt-3 text-xs text-slate-500">
                      AI Confidence: 92%
                    </p>

                  </div>

                  {/* Medium Severity Alert */}
                  <div className="rounded-lg border border-amber-900/50 bg-amber-950/20 p-4">

                    <div className="flex items-center justify-between gap-3">
                      <p className="font-medium text-white">
                        Voltage Anomaly
                      </p>

                      <Badge
                        variant="outline"
                        className="border-amber-900 text-amber-400"
                      >
                        MEDIUM
                      </Badge>
                    </div>

                    <p className="mt-2 text-sm text-slate-400">
                      Feeder F-204
                    </p>

                    <p className="mt-1 text-sm text-slate-400">
                      Village: Rajgurunagar
                    </p>

                    <p className="mt-3 text-xs text-slate-500">
                      AI Confidence: 84%
                    </p>

                  </div>

                  {/* Medium Severity Alert */}
                  <div className="rounded-lg border border-amber-900/50 bg-amber-950/20 p-4">

                    <div className="flex items-center justify-between gap-3">
                      <p className="font-medium text-white">
                        Current Surge
                      </p>

                      <Badge
                        variant="outline"
                        className="border-amber-900 text-amber-400"
                      >
                        MEDIUM
                      </Badge>
                    </div>

                    <p className="mt-2 text-sm text-slate-400">
                      Transformer T-118
                    </p>

                    <p className="mt-1 text-sm text-slate-400">
                      Village: Manchar
                    </p>

                    <p className="mt-3 text-xs text-slate-500">
                      AI Confidence: 79%
                    </p>

                  </div>

                </CardContent>
              </Card>

            </div>

          

{/* Electrical Parameters */}
<Card className="border-slate-800 bg-slate-900 text-white"></Card>
             
            {/* Electrical Parameters */}
            <Card className="border-slate-800 bg-slate-900 text-white">

              <div className="border-b border-slate-800 p-5">
                <h3 className="font-semibold text-white">
                  Electrical Parameters
                </h3>

                <p className="mt-1 text-xs text-slate-500">
                  Voltage and current monitoring
                </p>
              </div>

              <div className="h-[300px] p-5">
                <ElectricalChart />
              </div>

            </Card>

          </div>
        </section>
      </div>
    </main>
  );
}