"""Supabase Storage helper for uploading and retrieving files."""

import os
from supabase import create_client, Client

SUPABASE_URL = os.environ.get("SUPABASE_URL", "")
SUPABASE_SERVICE_KEY = os.environ.get("SUPABASE_SERVICE_KEY", "")
SUPABASE_BUCKET = os.environ.get("SUPABASE_BUCKET", "books")

_client: Client | None = None


def get_supabase_client() -> Client:
    """Lazily create and return a Supabase client."""
    global _client
    if _client is None:
        if not SUPABASE_URL or not SUPABASE_SERVICE_KEY:
            raise RuntimeError(
                "SUPABASE_URL and SUPABASE_SERVICE_KEY must be set in environment"
            )
        _client = create_client(SUPABASE_URL, SUPABASE_SERVICE_KEY)
    return _client


def upload_file(path: str, data: bytes, content_type: str = "image/webp") -> str:
    """Upload a file to Supabase Storage and return its public URL.

    Args:
        path: Storage path, e.g. 'ORD-84920/page_1.webp'
        data: Raw file bytes
        content_type: MIME type of the file

    Returns:
        Public URL of the uploaded file
    """
    client = get_supabase_client()
    bucket = client.storage.from_(SUPABASE_BUCKET)

    # Upload (upsert=True to overwrite if re-uploading)
    bucket.upload(
        path=path,
        file=data,
        file_options={"content-type": content_type, "upsert": "true"},
    )

    # Get the public URL
    public_url = bucket.get_public_url(path)
    return public_url


def delete_folder(folder: str) -> None:
    """Delete all files in a folder (e.g. when re-uploading a book)."""
    client = get_supabase_client()
    bucket = client.storage.from_(SUPABASE_BUCKET)

    try:
        files = bucket.list(folder)
        if files:
            paths = [f"{folder}/{f['name']}" for f in files]
            bucket.remove(paths)
    except Exception:
        pass  # Folder may not exist yet, that's fine
