using Microsoft.AspNetCore.Mvc;
using Syncfusion.Pdf;
using System;
using System.Collections.Generic;
using System.Text;
using VikingVault.DataAccess.Models;

namespace VikingVault.Services.Abstractions
{
    public interface IPDFGeneratorService
    {
        FileStreamResult GetTransactionListAsPDF(string userId, string timeFilter);
        string GetTimeFilterHeaderText(string timeFilter);
        void CreatePDFHeader(PdfPage page, string timeFilter);
        List<TransactionDTO> FilterTransactionsByTime(List<TransactionDTO> transactionList, string timeFilter);
        void AddTransactionListIntoPDF(PdfPage page, string userId, string timeFilter);
    }
}
