using System;
using System.Collections.Generic;
using System.Text;
using VikingVault.Services.Abstractions;
using Syncfusion.Pdf;
using Syncfusion.Pdf.Graphics;
using Syncfusion.Drawing;
using System.IO;
using Microsoft.AspNetCore.Mvc;
using Syncfusion.Pdf.Tables;
using System.Data;
using Syncfusion.Pdf.Grid;
using VikingVault.DataAccess.Models;

namespace VikingVault.Services
{
    public class PDFGeneratorService : IPDFGeneratorService
    {
        private ITransactionService _transactionService;

        public PDFGeneratorService(ITransactionService transactionService)
        {
            _transactionService = transactionService;
        }

        public string GetTimeFilterHeaderText(string timeFilter)
        {
            if (timeFilter == "day")
            {
                return "Transactions per last day";
            }
            else if (timeFilter == "week")
            {
                return "Transactions per last week";
            }
            else if (timeFilter == "month")
            {
                return "Transactions per last month";
            }
            else
            {
                return "All transactions";
            }
        }

        public void CreatePDFHeader(PdfPage page, string timeFilter)
        {
            string timeFilterHeaderText = GetTimeFilterHeaderText(timeFilter);
            PdfGraphics graphics = page.Graphics;
            PdfFont fontReportText = new PdfStandardFont(PdfFontFamily.Helvetica, 20, PdfFontStyle.Bold);
            PdfFont fontTimeText = new PdfStandardFont(PdfFontFamily.Helvetica, 15, PdfFontStyle.Bold);
            PdfBrush brush = new PdfSolidBrush(new PdfColor(13, 68, 80));
            PdfFont fontDateText = new PdfStandardFont(PdfFontFamily.Helvetica, 10, PdfFontStyle.Italic);
            PdfBrush brushDate = new PdfSolidBrush(new PdfColor(70, 77, 79));
            PdfBitmap wirtekImage = new PdfBitmap(File.OpenRead("Resources\\logo_wirtek.png"));
            graphics.DrawImage(wirtekImage, -35, 0, 300, 45);
            graphics.DrawString("Report", fontReportText, brush, new PointF(32, 45));
            graphics.DrawString(timeFilterHeaderText, fontTimeText, PdfBrushes.Orange, new PointF(50, 80));
            graphics.DrawString("Today's date: " + DateTime.Today.Date.ToShortDateString(), fontDateText, brushDate, new PointF(380, 110));
        }

        public List<TransactionDTO> FilterTransactionsByTime(List<TransactionDTO> transactionList, string timeFilter)
        {
            if (timeFilter == "day")
            {
                transactionList = transactionList.FindAll(transaction => transaction.Date.Day == DateTime.Today.Day);
            }
            else if (timeFilter == "week")
            {
                transactionList = transactionList.FindAll(transaction => transaction.Date > DateTime.Today.Date.AddDays(-7));
            }
            else if (timeFilter == "month")
            {
                transactionList = transactionList.FindAll(transaction => transaction.Date.Month == DateTime.Today.Month);
            }
            return transactionList;
        }
        
        public void AddTransactionListIntoPDF(PdfPage page, string userId, string timeFilter)
        {
            List<TransactionDTO> transactionList = _transactionService.GetAllTransactions(userId);
            transactionList = FilterTransactionsByTime(transactionList, timeFilter);

            PdfStandardFont columnHeaderFont = new PdfStandardFont(PdfFontFamily.Helvetica, 11, PdfFontStyle.Bold);
            PdfSolidBrush columnHeaderBrush = new PdfSolidBrush(new PdfColor(13, 68, 80));
            PdfStandardFont columnDataFont = new PdfStandardFont(PdfFontFamily.Helvetica, 7, PdfFontStyle.Italic);
            PdfSolidBrush columnDataBrush = new PdfSolidBrush(new PdfColor(70, 77, 79));
            PdfGraphics graphics = page.Graphics;

            graphics.DrawString("Date", columnHeaderFont, columnHeaderBrush, new PointF(15, 150));
            graphics.DrawString("Type", columnHeaderFont, columnHeaderBrush, new PointF(75, 150));
            graphics.DrawString("Amount", columnHeaderFont, columnHeaderBrush, new PointF(125, 150));
            graphics.DrawString("Currency", columnHeaderFont, columnHeaderBrush, new PointF(195, 150));
            graphics.DrawString("Details", columnHeaderFont, columnHeaderBrush, new PointF(256, 150));
            graphics.DrawString("Description", columnHeaderFont, columnHeaderBrush, new PointF(407, 150));

            int x = 15;
            int y = 180;

            foreach (TransactionDTO transaction in transactionList)
            {
                graphics.DrawString(transaction.Date.ToShortDateString(), columnDataFont, columnDataBrush, new PointF(x, y));
                graphics.DrawString(transaction.Type, columnDataFont, columnDataBrush, new PointF(x + 60, y));
                graphics.DrawString(transaction.Amount.ToString().Trim('-'), columnDataFont, columnDataBrush, new PointF(x + 110, y));
                graphics.DrawString(transaction.Currency.ToUpper(), columnDataFont, columnDataBrush, new PointF(x + 180, y));

                if (transaction.Type == "Exchange")
                {
                    graphics.DrawString("Exchanged into " + transaction.Details.ToString(), columnDataFont, columnDataBrush, new PointF(x + 240, y));
                    graphics.DrawString("Money Exchange", columnDataFont, columnDataBrush, new PointF(x + 390, y));
                }
                else
                {
                    string transferText = string.Empty;
                    string transactionDetails = TrimmTransactionDetails(transaction);

                    if (transaction.IsUserSender == true)
                    {
                        transferText = "Sent to " + transaction.Receiver.FirstName.ToString() + " " + transaction.Receiver.LastName.ToString();
                    }
                    else
                    {
                        transferText = "Received from " + transaction.Sender.FirstName.ToString() + " " + transaction.Sender.LastName.ToString();
                    }

                    graphics.DrawString(transferText, columnDataFont, columnDataBrush, new PointF(x + 240, y));
                    graphics.DrawString(transactionDetails, columnDataFont, columnDataBrush, new PointF(x + 390, y));
                }
                y = y + 25;
            }
        }

        public string TrimmTransactionDetails (TransactionDTO transaction)
        {
            var transactionDetails = transaction.Details.ToString();
            var maximumTextLength = 23;
            if (transactionDetails.Length > maximumTextLength)
            {
                transactionDetails = transactionDetails.Substring(0, maximumTextLength) + "...";
            }
            return transactionDetails;
        }

        public FileStreamResult GetTransactionListAsPDF(string userId, string timeFilter)
        {
            PdfDocument document = new PdfDocument();
            PdfPage page = document.Pages.Add();
            CreatePDFHeader(page, timeFilter);
            AddTransactionListIntoPDF(page, userId, timeFilter);
            MemoryStream stream = new MemoryStream();
            document.Save(stream);
            stream.Position = 0;
            FileStreamResult fileStreamResult = new FileStreamResult(stream, "application/pdf");
            fileStreamResult.FileDownloadName = "Viking Vault Report.pdf";
            return fileStreamResult;
        }
    }
}
