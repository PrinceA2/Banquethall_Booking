using System.IO.Compression;
using System.Text;

namespace BanquetHallData.CompressionHelpers
{
    public class GzipHelper
    {
        // Compress a string and return it as a base64-encoded string
        public static string CompressStringToBase64(string text)
        {
            if (string.IsNullOrEmpty(text)) return text;

            var bytes = Encoding.UTF8.GetBytes(text);
            using var outputStream = new MemoryStream();
            using (var gzipStream = new GZipStream(outputStream, CompressionMode.Compress))
            {
                gzipStream.Write(bytes, 0, bytes.Length);
            }
            return Convert.ToBase64String(outputStream.ToArray());
        }

        // Decompress a base64-encoded string
        public static string DecompressBase64ToString(string base64Text)
        {
            if (string.IsNullOrEmpty(base64Text) || !IsBase64String(base64Text))
            {
                throw new ArgumentException("Invalid Base64 string");
            }

            byte[] bytes = Convert.FromBase64String(base64Text);
            using (var inputStream = new MemoryStream(bytes))
            using (var gzipStream = new GZipStream(inputStream, CompressionMode.Decompress))
            using (var reader = new StreamReader(gzipStream, Encoding.UTF8))
            {
                return reader.ReadToEnd();
            }
        }

        // Check if a string is a valid Base64 string
        public static bool IsBase64String(string base64String)
        {
            if (string.IsNullOrEmpty(base64String) || base64String.Length % 4 != 0)
                return false;

            // Check if the string contains only valid Base64 characters and padding
            foreach (char c in base64String)
            {
                if (!((c >= 'A' && c <= 'Z') ||
                      (c >= 'a' && c <= 'z') ||
                      (c >= '0' && c <= '9') ||
                      c == '+' || c == '/' || c == '=')) // '=' is allowed for padding
                {
                    return false;
                }
            }

            // Try converting the string to bytes to check if it is a valid Base64 encoded string
            try
            {
                Convert.FromBase64String(base64String);
                return true;
            }
            catch
            {
                return false;
            }
        }
    }
}
