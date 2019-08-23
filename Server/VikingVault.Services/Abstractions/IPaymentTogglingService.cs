namespace VikingVault.Services.Abstractions
{
    public interface IPaymentTogglingService
    {
        bool? IsPaymentEnabled(int id);
        void ChangePaymentState(int id, string value);
    }
}