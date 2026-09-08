---
sequence: 1
date: "2026-09-07"
language: "en"
title: "LIR vs ML vs CR Coin Cells: A B2B Chemistry Selection Guide"
slug: "lir-ml-cr-coin-cell-chemistry-selection-b2b"
summary: "Compare LIR2032, ML2032 and CR2032 charging rules, usable energy, pulse limits and service costs to choose a coin cell chemistry for your next OEM design."
meta_description: "Compare LIR2032, ML2032 and CR2032 charging rules, usable energy, pulse limits and service costs to choose a coin cell chemistry for your next OEM design."
category: "Battery Academy"
keywords: ["LIR2032", "ML2032", "CR2032", "coin cell chemistry", "CC/CV charging", "OEM battery selection", "battery TCO"]
author: "VSZAPOWER Editorial Team"
cover_image: "https://www.vszapower.com/academy/images/lir-ml-cr-chemistry.webp"
---

## Start with chemistry, not the 2032 footprint

A 2032 designation describes a nominal mechanical format; it does not establish electrical interchangeability. Procurement must connect chemistry to the device's supply window, pulse demand, charging circuit and maintenance schedule. These manufacturer examples illustrate why a single “rechargeable replacement” specification is insufficient. They are reference cells, not verified specifications for every VSZAPOWER product.

### Three reference cells

| Reference cell | Nominal voltage | Rated capacity | Nominal energy proxy | Charging approach |
| --- | --- | --- | --- | --- |
| EEMB LIR2032 | 3.7 V | 45 mAh | 0.167 Wh | Model-specific CC/CV |
| Maxell ML2032 | 3.0 V | 65 mAh | 0.195 Wh | Manufacturer-defined low-voltage charging |
| Panasonic CR2032 | 3.0 V | 225 mAh | 0.675 Wh | Primary cell; do not recharge |

The energy column uses `E_nominal = V_nominal × capacity_Ah`; actual delivered energy is the integral of loaded voltage times current over time. Panasonic specifies a 0.2 mA continuous drain for its CR2032 reference data. This is not a universal pulse-current ceiling. See the [EEMB product specification](https://www.eemb.com/product-9), [Maxell ML specifications](https://www.maxell.eu/industry/coin-type-lithium-manganese-dioxide-rechargeable-batteries-ml/) and [Panasonic CR2032 datasheet](https://energy.panasonic.com/dam/master/pdf/en/datasheet/lithium/CR2032_Datasheet_EN.pdf).

CR combines lithium and manganese dioxide in a primary system. Maxell's rechargeable ML chemistry instead uses specially treated manganese dioxide and a lithium-aluminum negative material. LIR is rechargeable lithium-ion. Similar labels and dimensions therefore conceal different electrode systems and permitted voltage trajectories.

## Specify the entire charging sequence

EEMB's linked LIR2032 datasheet, dated April 2019, defines standard charging at 25°C: 0.2C constant current to 4.20 V, then constant voltage until current falls below 0.05C. For 45 mAh, these calculate to 9 mA and 2.25 mA. Reaching 4.20 V begins the tapering stage; it does not mean instantaneous full charge. The same document specifies at least 300 cycles with at least 80% capacity under standard conditions, not an unconditional 500-cycle life. [EEMB LIR2032 datasheet, sections 5.1–5.2](https://eemb.oss-accelerate.aliyuncs.com//uploads/20230323/ba65f4e593715c5dedf377f550c58f6b.pdf).

For an MCU-controlled charger, specify separate preconditioning, CC, CV, termination and fault states. TI's charger description distinguishes low-voltage conditioning from current-based termination and later recharge. That distinction prevents treating a small continuous current as permission to charge indefinitely. [TI BQ2057 charging sequence](https://www.ti.com/product/BQ2057C).

> [!WARNING]
> Never recharge CR cells or apply a LIR charging profile to ML2032. Do not maintain a full lithium-ion cell on continuous trickle charge. A “4.20 V ±0.05 V” design target is not manufacturer permission to reach 4.25 V; regulator, sensing and temperature errors must fit the actual approved limit, with protection thresholds specified separately.

Likewise, 20–50 mA corresponds to approximately 0.44–1.11C for a 45 mAh cell. Calling this “micro-current” does not establish suitability for LIR2016, LIR2025 or any other size.

Maxell describes ML charging at 3.0–3.3 V and lists ML2032 life as 1,000 cycles at 10% depth of discharge, versus 30 cycles at 100%. Its 65 mAh rating is measured at 200 µA, 20°C, to 2.0 V. Shallow RTC backup operation and deep daily cycling are fundamentally different duties. [Maxell charging and cycle conditions](https://www.maxell.eu/industry/coin-type-lithium-manganese-dioxide-rechargeable-batteries-ml/).

## Translate device requirements into acceptance tests

Apple specifies a CR2032 lithium 3 V battery for AirTag. A same-sized LIR cell is therefore not an authorized substitute. [Apple battery replacement instructions](https://support.apple.com/en-nz/102600).

For an OEM IoT node, verify regulator input limits and quiescent consumption. For automotive keys, measure transmitter peaks and cold-start margin. For smart locks, distinguish motor supply from memory backup. Solar watches and RTC circuits require the equipment manufacturer's approved rechargeable cell and charging window.

Use a first-order pulse check: `voltage sag ≈ pulse current × effective resistance`. An illustrative 20 mA pulse across 5 Ω gives 0.10 V sag; at 15 Ω it gives 0.30 V. These are assumed values, not measurements. Aging, temperature and contacts can erode voltage margin before nominal capacity is exhausted. Validate the complete pulse waveform at the device's shutdown threshold.

## Compare service energy and labor, not cycle counts

Consider a hypothetical procurement scenario: a 45 mAh LIR cell averages 3.7 V during discharge, achieves 500 cycles at 80% depth of discharge, averages 80% capacity retention, and supplies a 90%-efficient converter. The 500-cycle assumption requires separate qualification; the EEMB specification above does not establish it.

`LIR delivered energy = 3.7 V × 0.045 Ah × 500 × 0.80 × 0.80 × 0.90 = 47.952 Wh`

Assume each CR2032 delivers 80% of its nominal energy: `3.0 V × 0.225 Ah × 0.80 = 0.540 Wh`. Equal service requires approximately 88.8 CR cells, not 500. At an assumed 5 mW average load, both totals represent about 9,590 operating hours; the average LIR interval is only 19.2 hours between charges, versus 108 hours per CR replacement.

Assume prices of $2 per LIR cell, $5 allocated charger cost, $0.40 per CR cell, labor at $12/hour and 30 seconds per replacement or recharge. These are illustrative inputs, not quotations. CR service costs about `$0.50 × 88.8 = $44.40`; LIR costs `$2 + $5 + $50 = $57.00` before electricity. At 85% charging efficiency and $0.20/kWh, recharge electricity adds approximately $0.013, excluding standby consumption.

`ROI = (avoided CR service cost − LIR service cost) / LIR service cost ≈ −22.1%`

Automated charging could change the result, but calendar aging, standby power, downtime and actual maintenance effort need qualification. Fewer discarded cells alone cannot establish a carbon reduction.

## Define the OEM procurement brief

Send operating voltage limits, pulse traces, temperature range, service interval and charging access with your [VSZAPOWER engineering inquiry](https://www.vszapower.com/#contact). Use the [charger manufacturing guide](https://www.vszapower.com/coin-cell-charger-manufacturer) to frame configuration questions, and continue through the [Battery Academy](https://www.vszapower.com/academy) for model-specific analysis.
