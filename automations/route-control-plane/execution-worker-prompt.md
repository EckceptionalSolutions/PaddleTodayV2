# Route execution worker

Work only in this repository. Process at most one queued route-control request.

1. Run `npx tsx scripts/route-control-plane-queue.ts take`.
2. If the result is `null`, stop successfully and say that the queue is empty. Do not change route data.
3. Save the returned request ID and kind.
4. Refresh leads with `npm run routes:leads:gather`.
5. Claim a matching work order with `npx tsx scripts/route-control-plane.ts claim --mode <kind>`.
6. Read `automations/route-control-plane/current-work-order.md` and every startup file it requires.
7. Execute the work order fully. Research must meet its evidence-touch contract. Implementation must meet all route safety and validation gates.
8. Create a completion report from `automations/route-control-plane/completion-report.template.json`, then run the work order's completion command.
9. Run proportionate tests for every changed file.
10. Mark the queue request complete with:
   `npx tsx scripts/route-control-plane-queue.ts complete <request-id> "<short result>"`

If a failure prevents completion, record the exact failure with:
`npx tsx scripts/route-control-plane-queue.ts fail <request-id> "<exact blocker and next retry condition>"`

Do not leave a request in `running`. Do not weaken evidence, access, gauge, coordinate, threshold, or safety requirements to produce an implementation.
