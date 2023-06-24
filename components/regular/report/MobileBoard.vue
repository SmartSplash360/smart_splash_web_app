<template>
  <div class="card flex flex-col lg:hidden">
    <Accordion :activeIndex="0">
      <AccordionTab header="View Jobs">
        <ModalsReportJobModal></ModalsReportJobModal>
      </AccordionTab>
      <AccordionTab header="View Quotes">
        <ModalsReportQuotesModal></ModalsReportQuotesModal>
      </AccordionTab>
      <AccordionTab header="View Invoices">
        <ModalsReportInvoicesModal></ModalsReportInvoicesModal>
      </AccordionTab>
      <AccordionTab header="View Chemical Cost">
        <ModalsReportChemicalSpentModal></ModalsReportChemicalSpentModal>
      </AccordionTab>
      <AccordionTab header="View Payment"> </AccordionTab>
    </Accordion>
  </div>
</template>

<script setup></script>
